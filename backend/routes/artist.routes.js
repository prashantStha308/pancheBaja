import express from "express";
import { createArtist, getAllArtists, getArtistById } from "../controllers/artist.controller";
import { upload } from "../config/multer.config";

const artistRouter = express.Router();

// creates an artist
artistRouter.post('/artist' , upload('profilePicture') , createArtist );
artistRouter.get('/artist' , getAllArtists );
artistRouter.get( '/artist/:id' , getArtistById );