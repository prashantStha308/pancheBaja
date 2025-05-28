import mongoose from "mongoose";

// add an "type" field as well

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
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
        src:{
            type: String,
            required: true,
        },
        publicId:{
            type: String,
            required: true,
        }
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
    type:{
        type: String,
        enum: ['playlist'],
        default: 'playlist'
    },
},
{
    timestamps: true
})


const Playlist = mongoose.model( 'Playlist' , playlistSchema );
export default Playlist;