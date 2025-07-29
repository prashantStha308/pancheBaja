import mongoose from "mongoose";
import { validationResult } from "express-validator"
import bcrypt from "bcrypt";

import { ApiError } from "./ApiError.js";
import User from "../models/user.model.js";


export const checkValidationResult = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400 , "Validation Error: " + errors.array());
    }
}

export const validateMongoose = (id, name = "Object Id") => {
    if (!id) {
        throw new ApiError(400, `${name} is required`);
    }
    const isValidId = (item) => mongoose.Types.ObjectId.isValid(item);

    if (Array.isArray(id)) {
        if (id.length === 0) throw new ApiError(400 , `${name} array cannot be empty`);
        if (!id.every(isValidId)) throw new ApiError(400, `Invalid ${name}`);
    } else {
        if (!isValidId(id)) throw new ApiError(400, `Invalid ${name}`);
    }

    return true;
}

export const validatePermission = (resourceOwnerId, currentUserId) => {
    if (resourceOwnerId.toString() !== currentUserId) {
        throw new ApiError(401, "Forbidden action.");
    }
}

export const validateExistance = (asset) => {
    if (!asset) {
        throw new ApiError(404, "Asset Not Found");
    }
}

export const validatePassword = async (receivedPassword , userPassword) => {
    const isMatch = await bcrypt.compare(receivedPassword, userPassword);
    if (!isMatch) {
        throw new ApiError(400, "Invalid Password");
    }
}