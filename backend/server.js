import express, { json } from "express";
import cors from "cors";
import connectDb from "./config/db.config.js";
import { config } from "dotenv";
import userRouter from "./routes/users.route.js"
import trackRouter from "./routes/track.routes.js";
import playlistRouter from "./routes/playlist.routes.js";

config();
const app = express();

app.use(express.json());
app.use(cors());

app.use( '/api/user' , userRouter );
app.use( '/api/track' , trackRouter );
app.use( '/api/playlist' , playlistRouter );

app.listen( process.env.PORT , ()=>{
    console.log(`Server started at http://localhost:${process.env.PORT}`);
    connectDb();
} )