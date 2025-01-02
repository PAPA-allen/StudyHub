import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/ErrorHandler';
import { CatchAsyncError } from '../middleware/CatchAsyncError';
import { IUser, userModel } from '../models/user.model';
import jwt, { Secret } from 'jsonwebtoken';
import "dotenv/config";
import ejs from 'ejs';
import path from 'path';
import { sendMail } from '../utils/sendMail';
import { sendToken } from '../utils/jwt';


//register user
interface IregistrationBody{
    name: string;
    email: string;
    password: string;
};

export const registerUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;
    
        const isEmailExist = await userModel.findOne({ email });

        if (isEmailExist) {
            return next(new ErrorHandler("Email already exists", 400));
        };

        const user: IregistrationBody = {
            name,
            email,
            password,
        }

        //activation Token
        const activationToken = createActivationToken(user);

        const activationCode = activationToken.activationCode;

        const currentYear = new Date().getFullYear();

        const data = { user: { name: user.name }, activationCode, year: currentYear,  };

        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), data);

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
            })
        } catch (error:any) {
            return next(new ErrorHandler(error.message, 400));
            
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
    
    }
});

interface IActivationToken{
    token: string;
    activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({ user, activationCode }, process.env.ACTIVATION_SECRET as Secret, { expiresIn: "5m" });
    return { token, activationCode };   
}
 

interface IactivationBody {
    activation_token: string;
    activation_code: string;
 }
//activate user
export const activateUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
   try {
       const { activation_token, activation_code } = req.body as IactivationBody;
       const newUser: {
           user: IUser;
           activationCode: string;
       } = jwt.verify(activation_token, process.env.ACTIVATION_SECRET as Secret) as { user: IUser, activationCode: string };

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
})
 
//login user
interface ILoginbody{
    email: string;
    password: string;
}

export const loginUser = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const { email, password } = req.body as ILoginbody;

        if (!email || !password) {
            return next(new ErrorHandler("Please enter email and password", 400));
        };

        const user = await userModel.findOne({ email }).select("+password");

        if(!user) {
            return next(new ErrorHandler("Invalid email or password", 400));
        }

        const isPasswordMatch = await user.comparePassword(password);

        if (!isPasswordMatch) {
            return next(new ErrorHandler("Invalid email or password", 400));
        }

        sendToken(user, 200, res);

    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400));
    }
})