import mongoose from "mongoose";

const playlistSchema = mongoose.Schema({
    visibility:{
        type: String,
        enum: [ 'public' , 'private' , 'unlisted' ],
        default: 'public',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }],
    createdBy:{
        type: String,
        required: true,
        default: "Unknown User"
    },
    totalTracks:{
        type: Number,
        default: 0
    },
    trackList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    image:{
        type: String,
        required: true,
    },
    duration:{
        type: Number,
        default: 0 ,
        required: true,
    },
    saves:{
        type: Number,
        default: 0
    },
},
{
    timestamps: true
})


const Playlist = mongoose.model( 'Playlist' , playlistSchema );
export default Playlist;