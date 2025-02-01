import express from "express";
import { addAnswer, addQuestion, addReplyToReview, addReview, deleteCourse, editCourse, generateVideoUrl, getAllCourses, getCourseByUser, getSingleCourse, uploadCourse } from "../controllers/course.controller";
import { isAuthenticated, authorizeRoles } from '../middleware/auth';
import { updateAccessToken } from '../controllers/user.controller';
export const courseRouter = express.Router();


//upload course 
courseRouter.post("/create-course", updateAccessToken, isAuthenticated, authorizeRoles("admin"), uploadCourse);

//edit course
courseRouter.put("/edit-course/:id", updateAccessToken, isAuthenticated, authorizeRoles("admin"), editCourse);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses", getAllCourses);

courseRouter.get("/get-courses-content/:id", updateAccessToken,
    isAuthenticated, getCourseByUser);

courseRouter.put("/add-question",updateAccessToken, isAuthenticated, addQuestion);

courseRouter.put("/add-answer",updateAccessToken,  isAuthenticated, addAnswer);

courseRouter.put("/add-review/:id", updateAccessToken, isAuthenticated, addReview);

courseRouter.put("/add-reply", updateAccessToken, isAuthenticated,authorizeRoles("admin"), addReplyToReview);

courseRouter.put("/get-courses/", isAuthenticated,authorizeRoles("admin"), getAllCourses);

courseRouter.post("/getVdoCipherOTP",  generateVideoUrl);

courseRouter.delete("/delete-course/:id",updateAccessToken, isAuthenticated,authorizeRoles("admin"), deleteCourse);
