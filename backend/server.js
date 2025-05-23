import express from "express";
import connectDb from "./config/db.config.js";
import { config } from "dotenv";
import userRouter from "./routes/users.route.js"
import trackRouter from "./routes/track.routes.js";

config();
const app = express();

app.use( '/api/user/' , userRouter );
app.use( '/api/track/' , trackRouter ); 

app.listen( process.env.PORT , ()=>{
    console.log(`Server started at http://localhost:${process.env.PORT}`);
    connectDb();
} )