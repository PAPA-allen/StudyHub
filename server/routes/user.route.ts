import express from "express";
import { activateUser, deleteUser, getAllUsers, getUserInfo, loginUser, logoutUser, registerUser, socialAuth, updateAccessToken, updatePassword, updateProfilePicture, updateUserInfo, updateUserRole } from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

const userRouter = express.Router();


//register user
userRouter.post("/register", registerUser);

//activation token
userRouter.post("/activate-user", activateUser);

//login
userRouter.post("/login", loginUser);

//logout
userRouter.get("/logout", isAuthenticated, logoutUser);

//update access token
userRouter.get("/refreshtoken", updateAccessToken);

//me
userRouter.get("/me", isAuthenticated, getUserInfo )

//social-auth
userRouter.post("/social-auth", socialAuth);

//update user
userRouter.put("/update-user", isAuthenticated, updateUserInfo);

//update password
userRouter.put("/update-password", isAuthenticated, updatePassword);


//update profile picture
userRouter.put("/update-profile-picture", isAuthenticated, updateProfilePicture);

userRouter.get(
    "/get-users",
    isAuthenticated,
    authorizeRoles("admin"),
    getAllUsers
  );
  
  userRouter.put(
    "/update-user",
    isAuthenticated,
    authorizeRoles("admin"),
    updateUserRole
  );
  
  userRouter.delete(
    "/delete-user/:id",
    isAuthenticated,
    authorizeRoles("admin"),
    deleteUser
  );
export default userRouter;