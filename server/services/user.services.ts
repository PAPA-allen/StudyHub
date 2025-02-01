import { Response } from "express";
import { userModel } from "../models/user.model";
import { redis } from "../utils/redis";

//get user by id
export const getUserById = async (id: string, res: Response) => {
    const userJson = await redis.get(id);
  
    if (userJson) {
      const user = JSON.parse(userJson);
      res.status(200).json({
        success: true,
        user,
      });
    }
  };
  
  //Get all users --only for admin
  export const getAllUsersService = async (res: Response) => {
    const users = await userModel.find().sort({ createdAt: -1 });
  
    res.status(201).json({
      success: true,
      users,
    });
  };
  
  //update user role
  
  export const updateUserRoleService = async (res: Response, email: string, role: string) => {
    try {
      // Find user by email
      const user = await userModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }
  
      // Update the user's role
      user.role = role;
      await user.save();
  
      // Return a success response
      return res.status(200).json({
        success: true,
        message: 'User role updated successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while updating the role.',
      });
    }
  };
  