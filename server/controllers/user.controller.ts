import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/CatchAsyncError";
import { IUser, userModel } from "../models/user.model";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import "dotenv/config";
import ejs from "ejs";
import path from "path";
import { sendMail } from "../utils/sendMail";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendToken,
} from "../utils/jwt";
import { redis } from "../utils/redis";
import Redis, { RedisKey } from "ioredis";
import { getAllUsersService, getUserById, updateUserRoleService } from "../services/user.services";
import cloudinary from "cloudinary";

//register user
interface IregistrationBody {
  name: string;
  email: string;
  password: string;
}

export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const isEmailExist = await userModel.findOne({ email });

      if (isEmailExist) {
        return next(new ErrorHandler("Email already exists", 400));
      }

      const user: IregistrationBody = {
        name,
        email,
        password,
      };

      //activation Token
      const activationToken = createActivationToken(user);

      const activationCode = activationToken.activationCode;

      const currentYear = new Date().getFullYear();

      const data = {
        user: { name: user.name },
        activationCode,
        year: currentYear,
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Account Activation",
          template: "activation-mail.ejs",
          data,
        });
        res.status(201).json({
          success: true,
          message: `Please check email ${user.email} to activate your account!`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as Secret,
    { expiresIn: "5m" }
  );
  return { token, activationCode };
};

interface IactivationBody {
  activation_token: string;
  activation_code: string;
}
//activate user
export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } = req.body as IactivationBody;
      const newUser: {
        user: IUser;
        activationCode: string;
      } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as Secret
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }
      const { name, email, password } = newUser.user;

      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
        return next(new ErrorHandler("User already exists", 400));
      }
      const user = await userModel.create({ name, email, password });

      res.status(201).json({
        success: true,
        message: "Account activated successfully",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler("Invalid token", 400));
    }
  }
);

//login user
interface ILoginbody {
  email: string;
  password: string;
}

export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginbody;

      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }

      const user = await userModel.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      const isPasswordMatch = await user.comparePassword(password);

      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 400));
      }

      sendToken(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//logout user
export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refreshtoken", "", { maxAge: 1 });

      const userId = req.user?._id as RedisKey;

      redis.del(userId);

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//update access token
export const updateAccessToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;
      const message = "Could not refresh token";

      if (!decoded) {
        return next(new ErrorHandler(message, 400));
      }
      const session = await redis.get(decoded.id as string);

      if (!session) {
        return next(new ErrorHandler("Please login to access this resource", 400));
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "3d",
        }
      );

      req.user = user;

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      await redis.set(user._id, JSON.stringify(user), "EX", 604800) //7 days

      res.status(200).json({
        status: "success",
        accessToken,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get user info
export const getUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id as string;
      getUserById(userId, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);


interface ISocialAuthBody { 
    email: string;
    name: string;
    avatar: string;
}
//social-auth
export const socialAuth = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, avatar } = req.body as ISocialAuthBody;
        const user = await userModel.findOne({ email });

        if (!user) {
            const newUser = await userModel.create({ name, email, avatar });
            sendToken(newUser, 200, res);
        } else {
            sendToken(user, 200, res)
        }
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
        
    }
});

interface IUpdateUserBody { 
    name?: string;
    email?: string;
}

//update user info
export const updateUserInfo = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email } = req.body as IUpdateUserBody;
        const userId = req.user?._id as string;
        const user = await userModel.findById(userId);

        // if (email && user) {
        //     const isEmailExist = await userModel.findOne({ email });
        //     if (isEmailExist) {
        //         return next(new ErrorHandler("Email already exists", 400));
        //     }
        //     user.email = email;
        // }
        if (user && name) {
            user.name = name;
        }

        await user?.save();

        await redis.set(userId, JSON.stringify(user));

        res.status(201).json({
            success: true,
            user,
        })

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    
    }
});

//update password
interface IUpdatePasswordBody { 
    oldPassword: string;
    newPassword: string;
}

export const updatePassword = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { oldPassword, newPassword } = req.body as IUpdatePasswordBody;

        if (!oldPassword || !newPassword) {
            return next(new ErrorHandler("Please enter current and new password", 400));
        }
        
        const user = await userModel.findById(req.user?._id).select("+password");
        
        if (user?.password === undefined) {
            return next(new ErrorHandler("invalid user", 400));
        }
        
        const isPasswordMatch = await user?.comparePassword(oldPassword);

        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid old password", 400));
        }
        user.password = newPassword;

        await user.save();

        await redis.set(req.user?._id as RedisKey, JSON.stringify(user));

        res.status(201).json({
            success: true,
            user,
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
        
    }
});


interface IUpdateAvatarBody { 
    avatar: string
}

//update profile picture
export const updateProfilePicture = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { avatar } = req.body;
  
        const userId = req.user?._id;
  
        const user = await userModel.findById(userId);
  
        if (avatar && user) {
          //if we have one avatar then call this if
          if (user?.avatar?.public_id) {
            //first delete the old image
            await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
              folder: "avatars",
              width: 150,
            });
            user.avatar = {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            };
          } else {
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
              folder: "avatars",
              width: 150,
            });
            user.avatar = {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            };
          }
        }
        await user?.save();
  
        await redis.set(userId as RedisKey, JSON.stringify(user));
  
        res.status(200).json({
          success: true,
          user,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    }
  );
  
  //get all users --only for admin
export const getAllUsers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//pdate user role --only for admin
export const updateUserRole = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.body;
      updateUserRoleService(res, id, role);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//Delete user --only for admin
export const deleteUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }
      await user.deleteOne({ id });

      await redis.del(id);

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
