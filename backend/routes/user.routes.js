// Necessities
import express from "express";
import upload from "../config/multer.config.js";
// Controllers
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserDetails,
    loginUser,
    updateUser,
    userDetailsById
} from "../controllers/user.controller.js";
import { getAllArtists } from "../controllers/artist.controller.js";
// Middlewares
import { authorize } from "../middleware/authorize.js";
import { sanitizeAndValidateUserBody, sanitizeUserQuery , sanitizeUserParams, sanitizeLogin } from "../middleware/sanitizor.js";

// Router
const userRouter = express.Router();

// Routes

// Create User
userRouter.post('/',upload.fields([
    { name: 'coverArt', maxCount: 1 },
    { name: 'profilePicture' , maxCount: 1 }
]) , sanitizeAndValidateUserBody ,createUser);
// Login
userRouter.post('/login' , sanitizeLogin , loginUser);
// Get logged in user's data
userRouter.get('/me', authorize(['user', 'artist', 'admin']), getUserDetails);
// Get All users
userRouter.get('/', getAllUsers);
// Delete logged in user
userRouter.delete('/me/delete', authorize(['user' , 'artist' , 'admin']), deleteUser);
// update logged in user
userRouter.patch('/me/update', authorize(['user' , 'artist' , 'admin']), upload.fields([
    { name: 'profilePicture', maxCount: 1 },
    { name: 'coverArt', maxCount: 1 }
]), sanitizeAndValidateUserBody , updateUser);

// artists
userRouter.get('/artists', sanitizeUserQuery , getAllArtists);

// Dynamic Links
// Get user by ID
userRouter.get('/:userId', sanitizeUserParams , userDetailsById);

export default userRouter;