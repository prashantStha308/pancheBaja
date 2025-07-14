import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";

export const getAllArtists = async (req, res, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        throw new ApiError(400 , "Validation Error: " + errors.array());
    }
    let { page = 1, limit = 10 , city , country } = req.query;

    const queryObj = { role: 'artist' };
    if (city) {
        queryObj['location.city'] = city;
    }
    if (country) {
        queryObj['location.country'] = country;
    }

    const artists = await User.find(queryObj).select('-password -email -location -dob -subscription -trackList -playLists').skip((page - 1) * limit).limit(limit);
    
    res.status(200).json(new ApiResponse(200, "Fetched artists successfully", artists));

}