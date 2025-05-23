import mongoose from "mongoose";

const playlistSchema = mongoose.Schema({
    visibility:{
        type: String,
        enum: [ 'public' , 'private' , 'unlisted' ],
        default: 'public'
    },
    title: {
        type: String,
        required: true
    },
    artists: [{
        type: mongoose.Types.ObjectId,
        ref: 'Artist'
    }],
    totalTracks:{
        type: Number,
        default: 0
    },
    trackList: [{
        type: mongoose.Types.ObjectId,
        ref: 'Track'
    }],
    image:{
        type: String,
        required: true
    },
    totalDuration:{
        type: String,
        default: '00:00:00',
        required: true,
        match: /^[0-9]+(:[0-5][0-9]){2}$/ //exactly matches HH:MM:SS format
    },
    saves:{
        type: Number,
        default: 0
    }
    ,lastUpdated:{
        type: Date,
        default: Date.now
    },
},
{
    timestamps: true
})


const Playlist = mongoose.model( 'Playlist' , playlistSchema );
export default Playlist;