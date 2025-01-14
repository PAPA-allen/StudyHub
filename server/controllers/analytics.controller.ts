import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { generateLast12Monthsdata } from "../utils/analytics.generator";
import ErrorHandler from "../utils/ErrorHandler";
import { userModel } from "../models/user.model";
import CourseModel from "../models/course.model";
import OrderModel from "../models/order.model";


// get user analytics --only admin

export const getUserAnalytics = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const users = await generateLast12Monthsdata(userModel);

        res.status(200).json({
            success:true,
            users,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// get course analytics --only admin
export const getCoursesAnalytics = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const courses = await generateLast12Monthsdata(CourseModel);

        res.status(200).json({
            success:true,
            courses,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500))
    }
})


// get order analytics --only admin
export const getOrderAnalytics = CatchAsyncError(async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const orders = await generateLast12Monthsdata(OrderModel);

        res.status(200).json({
            success:true,
            orders,
        })
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 500))
    }
})


