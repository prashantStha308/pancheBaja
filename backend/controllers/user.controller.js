// Necessaries
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";
// Models
import User from "../models/user.model.js";
// Cloudinary services
import {
    deleteFromCloudinary,
    uploadToCloudinary
} from "../services/cloudinary.services.js";
// Helper functions
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    updateImageFile,
} from "../utils/helper.js";
import {
    validateMongoose,
    checkValidationResult,
    validatePassword,
} from "../utils/validator.js";
import {
    checkExistingUserByEmail,
    uploadUserMedias,
    deleteUserMediaUploads,
    getUserStats,
    getQueryFilteredUsers,
    getUserFollowingAndFollowerData,
} from "../helpers/user.helper.js";


export const createUser = async (req, res, next) => {
    let profilePictureId , coverArtId;
    try {
        checkValidationResult(req);
        const body = req.body;
        const files = req.files;

        await checkExistingUserByEmail(body.email);
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const { profilePicture, coverArt } = await uploadUserMedias(files);
        profilePictureId = profilePicture.publicId;
        coverArtId = coverArt.publicId;
        
        const user = await User.create({
            ...body,
            password: hashedPassword,
            profilePicture,
            coverArt,
        })

        return res.status(201).json(new ApiResponse(201, 'User Created Successfully', { id: user._id }));

    } catch (error) {
        await deleteUserMediaUploads(profilePictureId , coverArtId);

        return next(new ApiError(500, error.message || 'Unexpected error occured'));
    }
}

export const loginUser = async (req, res, next) => {
    checkValidationResult(req);
    const body = req.body;
    const email = body.email;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, 'Unregistered Email');
    }

    await validatePassword(body.password , user.password);
    const token = jwt.sign({ id: user._id , role: user.role }, JWT_SECRET, {
        expiresIn: '30d',
    });

    return res.status(200).json(new ApiResponse(200, 'Logged In Successfully', { token }));
}

// get details of logged in user
export const getUserDetails = async (req, res, next) => {
    const userId = req.user.id;
    validateMongoose(userId);

    const user = await User.findById(userId).select('-password').lean();
    if (!user) {
        throw new ApiError(400, "User not found");
    }

    const userFollowingsAndSaves = await getUserStats(userId);

    res.status(200).json(new ApiResponse(200, "User Fetched Succesfully", {
        ...user,
        ...userFollowingsAndSaves
    }));
}

// user detail by ID
export const userDetailsById = async (req, res, next) => {
    checkValidationResult(req);
    const { userId } = req.params;

    validateMongoose(userId);

    const user = await User.findById(userId).select('-password -email -location -dob -subscription').lean();

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const followerFollowingData = await getUserFollowingAndFollowerData(userId);

    res.status(200).json(new ApiResponse(200, 'User found', {
        ...user,
        ...followerFollowingData
    }))

}

export const getAllUsers = async (req, res, next) => {
    checkValidationResult(req);

    const users = await getQueryFilteredUsers(req);

    res.status(200).json(new ApiResponse(200, "Fetched Users successfully", users));
}

export const getBulkUsersById = async (req, res, next) => {
    checkValidationResult(req);
    const { ids } = req.body;
    validateMongoose(ids);

    const users = await User.find({ _id: {$in: ids} }).select('-password -email -location -dob -subscription').lean();

    if (users.length === 0) {
        throw new ApiError(404, "No matching users associated with the ids");
    }

    const completeUserObj = await Promise.all(
        users.map(async (user) => {
            const stats = await getUserStats(user._id);
            return {
                ...user,
                ...stats
            };
        })
    );

    res.status(200).json(new ApiResponse(200, "Fetched Bulk users by ID successfully", completeUserObj));
}

export const deleteUser = async (req, res, next) => {
    const userId = req.user.id;
    validateMongoose(userId , "userId");
    
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    await deleteUserMediaUploads( user.profilePicture.publicId , user.coverArt.publicId );
    const deletedUser = await User.findByIdAndDelete(userId);

    res.status(200).json(new ApiResponse(200 , "User Deleted Successfully" , {id: deletedUser._id}))

}

export const updateUser = async (req, res, next) => {
    let profilePictureId, coverArtId;
    try {
        checkValidationResult(req);

        const userId = req.user.id;
        const {
            username,
            email,
            role,
            password
        } = req.body;
        const files = req.files;

        validateMongoose(userId);

        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (role) user.role = role;
        if (password && !(await bcrypt.compare(password, user.password))) {
            user.password = await bcrypt.hash(password, 10);
        }

        [profilePictureId, coverArtId] = await Promise.all([
            updateImageFile(user, 'profilePicture', files?.profilePicture),
            updateImageFile(user, 'coverArt', files?.coverArt)
        ]);

        await user.save();
    
        res.status(200).json(new ApiResponse(200, "User updated successfully", { id: userId }));

    } catch (error) {
        await deleteUserMediaUploads(profilePictureId , coverArtId);
        next(error);
    }
}