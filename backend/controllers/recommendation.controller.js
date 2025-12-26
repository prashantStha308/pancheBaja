// Libraries

// Models
import User from "../models/user.model.js";
import Track from "../models/track.model.js";
import Playlist from "../models/playlist.model.js";
// Utils and Helpers
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { getDataByGenre } from "../helpers/recommendation.helper.js";

// api/recommendation


export const getRecommendedTracks = async (req, res) => {
	const user = req.user;
	const { limit = 10, page = 1 } = req.query;

	if(!user)
		throw new ApiError(404, "User not found");

	const recommendedTracks = await getDataByGenre( Track,user.favouriteGenre, limit, page);

	return res.status(200).json(new ApiResponse(200, "Recommented Tracks fetched successfully", recommendedTracks));
}


export const getRecommendedPlaylists = async (req, res) => {
	const user = req.user;
	const { limit = 10, page = 1 } = req.query;

	if(!user)
		throw new ApiError(404, "User not found");

	const recommendedPlaylist = await getDataByGenre(Playlist, user.favouriteGenre, limit, page);

	return res.status(200).json(new ApiResponse(200, "Recommented Playlist fetched successfully", recommendedPlaylist));
}


export const getRecommendedArtists = async (req, res) => {
	const user = req.user;
	const { limit = 10, page = 1 } = req.query;

	if(!user)
		throw new ApiError(404, "User not found");

	const recommendedArtists = await getDataByGenre(User, user.favouriteGenre, limit, page);

	console.log("fetched artusts recommendedArtists")

	return res.status(200).json(new ApiResponse(200, "Recommented Artists fetched successfully", recommendedArtists));
}

export const getRecommendationPackage = async (req, res) => {
	const user = req.user;
	const {limit = 10, page = 1} = req.query;

	console.log(user);

	const genres = user.favouriteGenre;

	const [recommendedTracks,
		recommendedPlaylist,
		recommendedArtists
	] = await Promise.all([
		getDataByGenre(Track, genres, limit, page),
		getDataByGenre(Playlist, genres, limit, page),
		getDataByGenre(User, genres, limit, page)
	]);

	return res.status(200).json(new ApiResponse(200, "Recommndation Package fetched",{
		tracks: {...recommendedTracks},
		playlists: {...recommendedPlaylist},
		artists: {...recommendedArtists}
	}));
}