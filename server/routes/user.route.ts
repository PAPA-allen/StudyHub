import express from "express";
import { activateUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller";
import { isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();


//register user
userRouter.post("/register", registerUser);

//activation token
userRouter.post("/activate-user", activateUser);

//login
userRouter.post("/login", loginUser);

//logout
userRouter.get("/logout", isAuthenticated, logoutUser);



export default userRouter;