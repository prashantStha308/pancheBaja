import axios from "axios"
import { setError, setSuccess } from "../utils/utils.services.js"
import { BASE_API_URL } from "../utils/constants.js";

const throwError = (res) => {
    throw new Error(res.data?.message || "API returned unsuccessful response");
}

export const getAllUsers = async (page = 1, limit = 10) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/user?page=${page}&limit=${limit}`);

        if (!res.data?.success) {
            throwError(res);
        }

        return setSuccess(res.data);
    } catch (error) {
        console.log("Error inside getAllUsers");    
        return setError( error );
    }
};

export const getUserById = async (id) => {
    console.log(id);
    try {
        const res = await axios.get(`${BASE_API_URL}/api/user/${id}`);
        
        if (!res.data?.success) {
            throwError(res);
        }
        
        return setSuccess(res.data);
    } catch (error) {
        console.log("Error inside getUserById");
        console.error(error);
        return setError( error );
    }
}

export const getBulkUsersById = async (ids) => {
    console.log(ids);
}

export const getUsersByCity = async (city, page = 1, limit = 10) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/user?city=${city}&page=${page}&limit=${limit}`);

        if (!res.data?.success) {
            throwError(res);
        }

        return setSuccess(res.data);
    } catch (error) {
        console.log("Error inside getUsersByCity");    
        return setError( error );
    }
}

export const getUsersByCountry = async (country, page = 1, limit = 10) => {
    try {
        const res = await axios.get(`${BASE_API_URL}/api/user?country=${country}&page=${page}&limit=${limit}`);

        if (!res.data?.success) {
            throwError(res);
        }

        return setSuccess(res.data);
    } catch (error) {
        console.log("Error inside getUsersByCity");    
        return setError( error );
    }
}

const validateQueryObj = (queryKeys) => {
  const allowedKeys = ['role', 'name', 'sort', 'page', 'limit', 'city', 'country'];
  
  return queryKeys.every(key => allowedKeys.includes(key));
};

export const getUsersByQuery = async (queryObj, page = 1, limit = 10) => {
    try {
        const queryKeys = Object.keys(queryObj);

        if (!validateQueryObj(queryKeys)) {
            throw new Error("Invalid parameters in query");
        }

        // Build queryString
        const optionQuery = queryKeys.map(key => `&${key}=${encodeURIComponent(queryObj[key])}`).join("");
        const queryString = `?page=${page}&limit=${limit}${optionQuery}`;
        console.log(queryString);

        const res = await axios.get(`${BASE_API_URL}/api/user${queryString}`);
        
        if (!res.data.success) {
            throwError(res.data);
        }

        return setSuccess(res.data);

    } catch (error) {
        console.log("Error inside getUsersByCity");
        return setError( error );
    }
}