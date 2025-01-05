import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import { CatchAsyncError } from "./CatchAsyncError";

export const isAuthenticated =CatchAsyncError(async(req: Request, res: Response, next: NextFunction) => { 
    const access_token = req.cookies.access_token;
    
    if (!access_token) {
        return res.status(401).json({
            message: "Please login to access this route",
            success: false,
        })
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string) as any;

    if(!decoded) {
        return next(new ErrorHandler("Invalid access token", 400));
    }

    const user = await redis.get(decoded.id)

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    } 

    req.user = JSON.parse(user);
    
    next();

}) 


//validate user roles
export const authorizeRoles = (...roles: string[]) => { 
    return (req: Request, res: Response, next: NextFunction) => { 
        if(!roles.includes(req.user?.role || "")) {
            return next(new ErrorHandler(`Role (${req.user?.role}) is not allowed to access this resource`, 403));
        }
        next();
    }
   
}