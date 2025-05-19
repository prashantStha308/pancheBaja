import mongoose from "mongoose";

const artistSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email:{
        type: String,
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
    role: "artist",
    imgLink: {
        type: String,
        default: "https://secure.gravatar.com/avatar/52168962f3d5dfc43a30c789f8fc03ef?s=96&d=mm&r=g",
        required: true
    },
    followers:{
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
    followedArtist:[{
        type: mongoose.Types.ObjectId,
        ref: 'Artist'
    }],
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