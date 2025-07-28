// Models
import Following from "../models/following.model.js";
// Utils and Helpers
import { ApiResponse } from "../utils/ApiResponse.js";
import {
    checkValidationResult,
    validateMongoose
} from "../utils/validator.js";
import {
    isExistingFollow,
    getAssociate,
    getFollowFollowingCount
} from "../helpers/following.helper.js";


export const toggleFollow = async (req, res, next) => {
    const userId = req.user.id;
    const { receiverId } = req.params;

    checkValidationResult(req);
    validateMongoose(receiverId);

    const follow = await isExistingFollow(userId, receiverId);
    if (follow) {
        await Following.deleteOne({ sender: userId, receiver: receiverId });
        return res.status(200).json(new ApiResponse(200, "Removed Following"));
    }

    const newFollow = await Following.create({
        sender: userId,
        receiver: receiverId
    });

    res.status(201).json(new ApiResponse(200, "Followed sucessfully", newFollow));
}

export const getAllFollowings = async (req, res, next) => {
    const userId = req.user.id
    checkValidationResult(req);

    const queryObj = { sender: userId };
    const followings = await getAssociate(queryObj, 'receiver' , req.params);
    const totalFollowings = await getFollowFollowingCount(queryObj);

    res.status(200).json(new ApiResponse(200, "Fetched Followings successfully", {
        ...followings,
        totalFollowings
    }));
}

export const getAllFollowers = async (req, res, next) => {
    const userId = req.user.id;
    checkValidationResult(req);

    const queryObj = { receiver: userId };
    const followers = await getAssociate(queryObj, 'sender', req.params);
    const totalFollowers = await getFollowFollowingCount(queryObj);

    res.status(200).json(new ApiResponse(200, "Fetched Followers successfully", {
        ...followers,
        totalFollowers
    }));
}