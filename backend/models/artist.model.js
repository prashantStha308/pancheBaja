import mongoose from "mongoose";

const artistSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    gender:{
        type: String
    },
    role: {
        type: String,
        enum: ['artist'],
        default: 'artist',
    },
    imgLink: {
        type: String,
        default: "https://secure.gravatar.com/avatar/52168962f3d5dfc43a30c789f8fc03ef?s=96&d=mm&r=g",
        required: true
    },
    followersCount:{
        type: Number,
        default: 0
    },
    listeners:{
        type: Number,
        default: 0
    },
    tracks:[{
        type: mongoose.Types.ObjectId,
        ref: 'Track'
    }],
    album:{
        type: mongoose.Types.ObjectId,
        ref: 'Album'
    },
    followed:{
        artist:[{
            type: mongoose.Types.ObjectId,
            ref: 'Artist'
        }],
        user:{
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    },
    likedTracks:[{
        type: mongoose.Types.ObjectId,
        ref: 'Track'
    }],
    savedPlaylist: [{
        type: mongoose.Types.ObjectId,
        ref: 'Playlist'
    }]
},
{
    timestamps: true
})

const Artist = mongoose.model( 'Artist' , artistSchema );
export default Artist;