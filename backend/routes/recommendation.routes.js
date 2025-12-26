import express from "express";
import {
	getRecommendedTracks,
	getRecommendedPlaylists,
	getRecommendedArtists,
	getRecommendationPackage
} from "../controllers/recommendation.controller.js";
import { authorize } from "../middleware/authorize.js"
import { sanitizeBasicQuery ,sanitizeFollowingParams } from "../middleware/sanitizor.js";

const recommendationRouter = express.Router();

/* [GET] */

// Get Recommended tracks
recommendationRouter.get("/tracks", authorize(['user','artist','admin']) , getRecommendedTracks);

// Get Recommended playlists
recommendationRouter.get("/playlists", authorize(['user','artist','admin']), getRecommendedPlaylists);

// Get Recommended Artists
recommendationRouter.get("/artists", authorize(['user','artist','admin']), getRecommendedArtists);

// Get Recommended Package
recommendationRouter.get("/package", authorize(['user','artist','admin']), getRecommendationPackage)


export default recommendationRouter;