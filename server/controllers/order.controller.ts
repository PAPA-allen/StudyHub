import { NextFunction, Request, Response } from "express";

import CourseModel from "../models/course.model";
import path from "path";
import ejs from "ejs";
import { getAllOrdersService, newOrder } from "../services/order.service";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import OrderModel, { IOrder } from "../models/order.model";
import NotificationModel from "../models/notification.model";
import sendMail from "../utils/sendMail";
import { userModel } from "../models/user.model";
import "dotenv/config";
import { redis } from "../utils/redis";
import { RedisKey } from "ioredis";
const paystack = require('paystack-api');
const paystackInstance = paystack(process.env.PAYSTACK_SECRET_KEY);

//create order
export const createorder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
      if (payment_info) {
        if ("reference" in payment_info) {
          const paymentReference = payment_info.reference;
          
          // Verify the payment via Paystack using the reference
          const paymentVerification = await paystackInstance.transaction.verify(paymentReference);

          if (paymentVerification.status !== "success") {
            return next(new ErrorHandler("Payment not authorized", 400));
          }
        }
}
      const user = await userModel.findById(req.user?._id);

      const courseExistingUser = user?.courses.some((course: any) => course._id.toString() === courseId)
      
      if (courseExistingUser) {
        return next(new ErrorHandler("You have already purchased this course", 400));
      }
      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      const mailData = {
        order: {
          _id: (course._id as string).toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          currentYear: new Date().getFullYear(),
        },
      };


      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push({ courseId: course?._id as string });

      await redis.set(req.user?._id as RedisKey, JSON.stringify(user));
      await user?.save();


      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have a new order from ${course?.name}`,
      });

      course.purchased = (course.purchased || 0) + 1;

      await course.save();

      newOrder(data, res, next);
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all orders --only for admin
export const getAllOrders = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
  try {
    getAllOrdersService(res);
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 500))
  }
})

// Send Paystack Public Key to the client
export const sendPaystackPublishableKey = CatchAsyncError(async (req:Request, res:Response, next:NextFunction) => {
  res.status(200).json({
    PublishableKey: process.env.PAYSTACK_PUBLISHABLE_KEY // Your Paystack public key here
  })
});


// Create a new payment with Paystack
export const newPayment = CatchAsyncError(async (req:Request, res:Response, next:NextFunction) => {
  try {
    const { amount, email } = req.body;
    const paymentData = {
      amount: amount * 100, 
      email: email,         
      currency: 'GHS',       
      
    };

    const response = await paystackInstance.transaction.initialize(paymentData);

    // Send the authorization URL to the client for redirection
    if (response.status === 'success') {
      res.status(201).json({
        success: true,
        authorization_url: response.data.authorization_url, 
        payment_refrence:response.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: response.message,
      });
    }
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 500));
  }
});
