// Essential packages
import express from "express";
import path from 'path';
import cors from 'cors';
// Configurations
import { PORT } from "./config/env.config.js";
import connectDb from "./config/db.config.js";
// Routes imports
import trackRouter from "./routes/track.routes.js";
import userRouter from "./routes/user.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import trackSaveRouter from "./routes/saves/trackSave.routes.js";
import playlistSaveRouter from "./routes/saves/playlistSave.routes.js";
import followingRouter from "./routes/following.routes.js";
import recommendationRouter from "./routes/recommendation.routes.js";

// app
const app = express();

// resolving correct path
const __dirname = path.resolve(); 

// Middlewares
const corsOptions = {}
app.use(cors(corsOptions));
app.use(express.json({limit: '16kb'}));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/track', trackRouter);
app.use('/api/user', userRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/save/track', trackSaveRouter);
app.use('/api/save/playlist', playlistSaveRouter);
app.use('/api/following' , followingRouter);
app.use('/api/recommendation', recommendationRouter);

// production setup for serving frontend build
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get( /.*/, (req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    } )
}

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
    connectDb();
})