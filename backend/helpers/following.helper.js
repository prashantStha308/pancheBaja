import Following from "../models/following.model.js";

export const isExistingFollow = async (userId, receiverId) => {
    return await Following.findOne({ sender: userId, receiver: receiverId });
}

export const getAssociate = async (queryObj, path, params) => {

    const { page = 1, limit = 50 } = params;

    return await Following.find(queryObj).skip( (page - 1) * limit ).limit(limit).select(path).populate({
        path,
        select: '_id username profilePicture role'
    }).lean()
}

export const getFollowFollowingCount = async (queryObj) => {
    return await Following.countDocuments(queryObj);
}