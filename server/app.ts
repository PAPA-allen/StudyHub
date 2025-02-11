import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/ErrorMiddleware";
import userRouter from "./routes/user.route";
import { courseRouter } from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRoute from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
import { rateLimit } from 'express-rate-limit'
//body parser
const app = express();

//cors => cross origin resource sharing
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials:true,
}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));

//cookie parser
app.use(cookieParser());


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})
// //testing api
// app.get("/", (req:Request, res:Response) => {
//     res.status(200).json({
//         message: "Hello World",
//         success: true,
//     })
// });
//routes
app.use("/api/v1", userRouter, courseRouter, orderRouter, notificationRoute, analyticsRouter, layoutRouter);

//unknown route
app.all("*", (req: Request, res: Response, next:NextFunction) => { 
    const error = new Error(`Resource ${req.originalUrl} not found`) as any;
    error.statusCode = 404;
    next(error)
})

//middleware course
app.use(limiter);

//error middleware
app.use(ErrorMiddleware);



export default app;