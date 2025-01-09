import express from "express";
import { editCourse, uploadCourse } from "../controllers/course.controller";
import { isAuthenticated, authorizeRoles } from '../middleware/auth';
export const courseRouter = express.Router();


//upload course 
courseRouter.post("/create-course", isAuthenticated, authorizeRoles("admin"), uploadCourse);

//edit course
courseRouter.put("/edit-course/:id", isAuthenticated, authorizeRoles("admin"), editCourse);
