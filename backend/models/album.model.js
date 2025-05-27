import mongoose from "mongoose";

const albumSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    totalTracks:{
        type: Number,
        default: 0
    },
    trackList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    totalDuration:{
        type: String,
        default: '00:00:00',
        required: true,
        match: /^[0-9]+(:[0-5][0-9]){2}$/ //exactly matches HH:MM:SS format
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