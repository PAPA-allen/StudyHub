import "dotenv/config";
import jwt from "jsonwebtoken";
import { IUser } from "../models/user.model";
import { Response } from "express";
import { redis } from "./redis";
import { RedisKey } from "ioredis";

interface IToken {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "strict" | "lax" | "none" | undefined;
  secure?: boolean;
}

 //parse environment variables to integrate with fallback values
 const accessTokenExpires = parseInt(
    process.env.ACCESS_TOKEN_EXPIRES_IN || "300",
    10
);
const refreshTokenExpires = parseInt(
    process.env.REFRESH_TOKEN_EXPIRES_IN || "1200",
    10
  );

  //options for cookies
  export const accessTokenOptions: IToken = {
    expires: new Date(Date.now() + accessTokenExpires * 60 * 60 * 1000),
    maxAge: accessTokenExpires * 60 * 60 *  1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };

  export const refreshTokenOptions: IToken = {
    expires: new Date(Date.now() + refreshTokenExpires * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpires *  24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };


export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  //upload sesson to redis
  redis.set(user._id as RedisKey, JSON.stringify(user));

 
  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
    
};
