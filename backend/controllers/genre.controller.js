// Models
import Track from "../models/track.model.js";
import Genre from "../models/genre.model.js";
// Utils and Helpers
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
// import {} from "../helpers/genre.helper.js";


/* [POST] */
export const createGenre = async (req, res) => {

	const { name, color = "#1DB954" } = req.body;

	if(!name)
		throw new ApiError(400, "Please include genre.name in request body");

	const check = await Genre.findOne({name}).exec();

	if(check)
		return res.status(200).json(200, "Genre already exists");

	const createdGenre = await Genre.create({
		name,
		color
	}).exec();

	return res.status(200).json(new ApiResponse(200, "Created new Genre", {id: createdGenre._id}));
}

// ---------------------------------------------------------------------------------------------------------------------

/* [GET] */

export const getAllGenres = async (req, res) => {

	let allGenres = await Track.distinct('genre')
	.sort({name: 1})
	.lean()
	.exec();
	// allGenres = allGenres.sort();

	res.status(200).json(new ApiResponse(200, "Fetched all available Genres", allGenres));
}

export const getAllGenres2 = async(req, res) => {
	const {
		name,
		id,
		slug
	} = req.query;

	let query = {};

	if(name) query.name = name;
	if(id) query.id = id;
	if(slug) query.slug = slug;

	const allGenre = await Track.find(query).lean().exec();

	return res.status(200).json(new ApiResponse(200, "Fetched all Genres", allGenres));
}

// ---------------------------------------------------------------------------------------------------------------------

/* [UPDATE] */

const updateGenre = async (req, res) => {

}

// ---------------------------------------------------------------------------------------------------------------------

/* [DELETE] */

const deleteGenreByName = async (req, res)=> {
	const {name} = req.params;

	const slug = name.toLowerCase().split(' ').join('-');

	await Genre.findOneAndDelete({slug}).exec();

	return res.status(200).json(new ApiResponse(200, "Deleted Genre Successfully"));
}