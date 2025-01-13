import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/ErrorMiddleware";
import userRouter from "./routes/user.route";
import { courseRouter } from "./routes/course.route";
import orderRouter from "./routes/order.route";

//body parser
const app = express();

//cors => cross origin resource sharing
app.use(cors({
    origin: ["http://localhost:3000"],
}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));

//cookie parser
app.use(cookieParser());


// //testing api
// app.get("/", (req:Request, res:Response) => {
//     res.status(200).json({
//         message: "Hello World",
//         success: true,
//     })
// });
//routes
app.use("/api/v1/", userRouter, courseRouter, orderRouter);

//unknown route
app.all("*", (req: Request, res: Response, next:NextFunction) => { 
    const error = new Error(`Resource ${req.originalUrl} not found`) as any;
    error.statusCode = 404;
    next(error)
})

//error middleware
app.use(ErrorMiddleware);



export default app;