import axios from "axios"
import { setError, setSuccess } from "../utils/utils.services.js";

export const getAllPlaylist = async (page = 1, limit = 10) => {
    try {

        const res = await axios.get(`/api/playlist?page=${page}&limit=${limit}`);

        if (!res.data?.success) {
            throw new Error(res.data?.message);
        }

        return res.data.data;
    } catch (error) {
        return setError(error);
    }
}

export const getPlaylistByid = async (id) => {
    try {
        console.log("Inside getPlaylistByid");

        const res = await axios.get(`/api/playlist/${id}`);

        if( !res.data?.success ){
            throw new Error(res.data?.message);
        }

        console.log(res);

        return res.data.data;

    } catch (error) {
        return setError(error);
    }
}

export const getPlaylistByUserId = async (userId) => {
    try {
        const res = await axios.get(`/api/playlist/${userId}`);

        if( !res.data?.success ){
            throw new Error(res.data?.message);
        }

        console.log(res.data);

        return setSuccess(res?.data);

    } catch (error) {
        return setError(error);
    }
}