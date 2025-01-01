import ErrorHandler from '../utils/ErrorHandler';
import { NextFunction, Request, Response } from 'express';


export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => { 
    let error = { ...err };
    error.message = err.message || "Internal Server Error";
    error.statusCode = err.statusCode || 500;


    //mongodb id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        error = new ErrorHandler(message, 400);
    }

    //duplicate key
    if (error.code === 11000) {
        const message = `Duplicate Field Value Enter`;
        error = new ErrorHandler(message, 400);
    } 

    //wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid. Try Again!!!`;
        error = new ErrorHandler(message, 400);
    }

    //token expired
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is expired. Try Again!!!`;
        error = new ErrorHandler(message, 400);
    }

    res.status(error.statusCode).json({
        message: error.message,
        success: false,
    })
}