import express, { json } from "express";
import cors from "cors";
import connectDb from "./config/db.config.js";
import { config } from "dotenv";
import userRouter from "./routes/users.route.js"
import trackRouter from "./routes/track.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import { fileURLToPath } from 'url';
import path from "path";

// models
// idk why,if import garena bhane won't sent data
import Artist from "./models/artist.model.js";
import User from "./models/user.model.js";
import Playlist from "./models/playlist.model.js";
import Album from "./models/album.model.js";

config();
const app = express();

// resolving correct path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), '..');  // <-- corrected to point to project root

app.use(express.json());
app.use(cors());

app.use( '/api/user' , userRouter );
app.use( '/api/track' , trackRouter );
app.use( '/api/playlist' , playlistRouter );

// production setup for serving frontend build
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}

app.listen( process.env.PORT , ()=>{
    console.log(`Server started at http://localhost:${process.env.PORT}`);
    connectDb();
} )