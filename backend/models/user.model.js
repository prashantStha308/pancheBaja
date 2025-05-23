import mongoose from "mongoose";

const UserScheme = mongoose.Schema({
    username: {
        type: String,
        trim: true,
        index: true,
        required: true
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        required: true,
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
        enum: ['user'],
        default: 'user',
        required: true
    },
    subscription:{
        type: String,
        enum: ['free','student','premium'],
        required: true
    },
    imgLink: {
        type: String,
        default: "https://secure.gravatar.com/avatar/52168962f3d5dfc43a30c789f8fc03ef?s=96&d=mm&r=g",
        required: true
    },
    likedTracks:[{
        type: mongoose.Types.ObjectId,
        ref: 'Track'
    }],
    likedAlbums:[{
        type: mongoose.Types.ObjectId,
        ref: 'Album'
    }],
    followed:{
        artist:[{
            type: mongoose.Types.ObjectId,
            ref: 'Artist'
        }],
        user:[{
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }]
    },
    followersCount:{
        type: Number,
        default: 0,
    },
    followers:[{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    playlist:{
        saved:[{
            type: mongoose.Types.ObjectId,
            ref: 'Playlist'
        }],
        created:{
            type: mongoose.Types.ObjectId,
            ref: 'Playlist'
        }
    },
},
{
    timestamps: true
})

const User = mongoose.model('User' , UserScheme);
export default User;