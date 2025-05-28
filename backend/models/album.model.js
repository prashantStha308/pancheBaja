import mongoose from "mongoose";

const albumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    totalTracks:{
        type: Number,
        required: true,
        default: 0
    },
    trackList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    totalDuration:{
        type: Number,
        default: 0,
        required: true,
    },
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }],
    saves:{
        type: Number,
        default: 0
    },
    likes:{
        type: Number,
        default: 0
    },
    type:{
        type: String,
        enum: ['album'],
        default: 'album'
    },
},
{
    timestamps: true
})


const Album = mongoose.model( 'Album' , albumSchema );
export default Album;