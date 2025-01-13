import express from "express";
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { isAuthenticated, authorizeRoles } from '../middleware/auth';
export const courseRouter = express.Router();


//upload course 
courseRouter.post("/create-course/", isAuthenticated, authorizeRoles("admin"), uploadCourse);

//edit course
courseRouter.put("/edit-course/:id", isAuthenticated, authorizeRoles("admin"), editCourse);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses", getAllCourses);

courseRouter.get("/get-courses-content/:id", isAuthenticated, getCourseByUser);

courseRouter.put("/add-question", isAuthenticated, addQuestion);

courseRouter.put("/add-answer", isAuthenticated, addAnswer);

courseRouter.put("/add-review/:id", isAuthenticated, addReview);

courseRouter.put("/add-reply", isAuthenticated,authorizeRoles("admin"), addReplyToReview);

courseRouter.put("/get-courses/", isAuthenticated,authorizeRoles("admin"), getAllCourses);

courseRouter.delete("/delete-course/:id", isAuthenticated,authorizeRoles("admin"), deleteCourse);
