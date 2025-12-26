import { JWT_SECRET } from "../config/env.config.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";

export const authorize = (allowedRoles) => {
   return async ( req , res , next ) => {
      try {
         const authHeader = req.headers['authorization'];
         const token = authHeader && authHeader.split(' ')[1];
         if (!token ) {
            return res.sendStatus(401);
         }
         
         let decodedData;
         try{
            decodedData = jwt.verify(token, JWT_SECRET);
         }catch(e){
            throw new ApiError(403, 'Invalid or expired token');
         }

         console.log('Decoded token:', decodedData);
         console.log('Allowed roles:', allowedRoles);
         console.log('User role from token:', decodedData.role);

         if (allowedRoles && !allowedRoles.includes(decodedData.role)) {
            throw new ApiError(403, `Access denied. Required roles: ${allowedRoles.join(', ')}`);
         }

         const user = await User.findOne({_id: decodedData.id})
         .select('-password')
         .lean()
         .exec();

         if (!user) {
            throw new ApiError(401, 'User not found');
         }

         req.user = user;
         next();

      } catch (error) {
         next(error);
      }
   }
}