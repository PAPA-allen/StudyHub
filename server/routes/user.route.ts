import express from "express";
import { activateUser, loginUser, registerUser } from "../controllers/user.controller";

const userRouter = express.Router();


//register user
userRouter.post("/register", registerUser);

//activation token
userRouter.post("/activate-user", activateUser);

//login
userRouter.post("/login", loginUser);

export default userRouter;