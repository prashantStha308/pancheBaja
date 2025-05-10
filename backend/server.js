import express from "express";
import connectDb from "./config/db.config.js";
import { config } from "dotenv";

config();
const app = express();

app.listen( process.env.PORT , ()=>{
    console.log(`Server started at http://localhost:${process.env.PORT}`);
    connectDb();
} )