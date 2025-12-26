import Track from "../models/track.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";

export const getAllGenres = async (req, res) => {

	let allGenres = await Track.distinct('genre')
	.sort({name: 1})
	.lean()
	.exec();
	// allGenres = allGenres.sort();

	res.status(200).json(new ApiResponse(200, "Fetched all available Genres", allGenres));
}