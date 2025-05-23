import express from "express";
import { createArtist, getAllArtists, getArtistById } from "../controllers/artist.controller";

const artistRouter = express.Router();

// creates an artist
artistRouter.post('/artist' , createArtist )
artistRouter.get('/artist' , getAllArtists );
artistRouter.get( '/artist/:id' , getArtistById )