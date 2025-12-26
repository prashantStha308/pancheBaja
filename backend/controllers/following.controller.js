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


/* [POST] */

export const toggleFollow = async (req, res, next) => {
    const user = req.user;
    const { receiverId } = req.params;

    checkValidationResult(req);
    validateMongoose(receiverId);

    const follow = await isExistingFollow(user._id, receiverId);
    if (follow) {
        await Following.deleteOne({ sender: user._id, receiver: receiverId }.exec());
        return res.status(200).json(new ApiResponse(200, "Removed Following"));
    }

    const newFollow = await Following.create({
        sender: user._id,
        receiver: receiverId
    });

    res.status(201).json(new ApiResponse(200, "Followed sucessfully", newFollow));
}

// ---------------------------------------------------------------------------------------------------------------------


/* [GET] */
export const getAllFollowings = async (req, res, next) => {
    const user = req.user;
    checkValidationResult(req);

    const queryObj = { sender: user._id };
    const followings = await getAssociate(queryObj, 'receiver' , req.params);
    const totalFollowings = await getFollowFollowingCount(queryObj);

    res.status(200).json(new ApiResponse(200, "Fetched Followings successfully", {
        ...followings,
        totalFollowings
    }));
}

export const getAllFollowers = async (req, res, next) => {
    const user = req.user;
    checkValidationResult(req);

    const queryObj = { receiver: user._id };
    const followers = await getAssociate(queryObj, 'sender', req.params);
    const totalFollowers = await getFollowFollowingCount(queryObj);

    res.status(200).json(new ApiResponse(200, "Fetched Followers successfully", {
        ...followers,
        totalFollowers
    }));
}