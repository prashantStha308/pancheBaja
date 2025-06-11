import express from "express";
import { createUser, getAllUsers, getUserById } from "../controllers/user.controller.js";
import { upload } from "../config/multer.config.js";

const userRouter = express.Router();

userRouter.get( '/' , getAllUsers );
userRouter.post( '/' , upload.single('profilePicture') , createUser );

userRouter.get( '/:id' , getUserById );

export default userRouter;