import Track from "../models/track.model.js";
import Playlist from "../models/playlist.model.js";
import User from "../models/user.model.js";
import { Error } from "mongoose";

export const getTracksByGenre = async (genres, limit, page)=>(

	Track.find({genre: {$in: genres}})
	.skip( (page - 1) * limit )
	.limit(limit)
	.populate([
		{path: 'primaryArtist', select: 'username profilePicture bio followerCount'},
		{path: 'artists', select: 'username profilePicture bio followerCount'}
	]).lean().exec()
)

export const getPlaylistsByGenre = async (genres, limit, page) => (

	Playlist.find({genre: {$in: genres}})
	.skip( (page - 1) * limit )
	.limit(limit)
	.populate([
		{path: 'createdBy', select: 'username profilePicture bio followerCount'},
		{path: 'artists', select: 'username profilePicture bio followerCount'}
	]).lean().exec()
)


export const getArtistsByGenre = async (genres, limit, page)=>(
	User.find({associatedGenre: {$in: genres}, role: "artist"})
	.select("-password -subscription -fullName -email -location -savedTracks -playlists")
	.skip( (page - 1) * limit )
	.limit(limit).lean().exec()
)

export const getDataByGenre = async(model, genres, limit, page) =>{
	switch(model){
		case Track:
			return getTracksByGenre(genres, limit, page);
			break;
		case Playlist:
			return getPlaylistsByGenre(genres, limit, page);
			break;
		case User:
			return getArtistsByGenre(genres, limit, page);
			break;
		default:
			throw new Error("Invalid model passed in getDataByGenre inside recommendation.helper.js");
	}
}