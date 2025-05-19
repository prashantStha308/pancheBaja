import mongoose from "mongoose";

const albumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    totalSongs:{
        type: Number,
        default: 0
    },
    totalDuration:{
        type: String,
        default: '00:00:00'
    },
    lastUpdated:{
        type: Date(),
        default: Date.now()
    },
    artists: [{
        type: mongoose.Types.ObjectId,
        ref: 'Artist'
    }],
    trackList: [{
        type: mongoose.Types.ObjectId,
        ref: 'Track'
    }],
    followers:{
        type: Number,
        default: 0
    },
    likes:{
        type: Number,
        default: 0
    },
},
{
    timestamps: true
})


const Album = mongoose.model( 'Album' , albumSchema );
export default Album;