import mongoose from "mongoose";
import { validationResult } from "express-validator"
import { ApiError } from "./ApiError.js";
import User from "../models/user.model.js";


export const validatorMiddlewareError = (req) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            throw new ApiError(400 , "Validation Error: " + errors.array());
        }
}

export const validateMongoose = (id , name = "Object Id") => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, `Invalid ${name}`);
    }
}