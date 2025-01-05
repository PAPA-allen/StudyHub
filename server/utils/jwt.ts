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

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  //upload sesson to redis
  redis.set(user._id as RedisKey, JSON.stringify(user));

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
  const accessTokenOptions: IToken = {
    expires: new Date(Date.now() + accessTokenExpires * 1000),
    maxAge: accessTokenExpires * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };

  const refreshTokenOptions: IToken = {
    expires: new Date(Date.now() + refreshTokenExpires * 1000),
    maxAge: refreshTokenExpires * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("access_token", accessToken, accessTokenOptions);
  res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
    
};
