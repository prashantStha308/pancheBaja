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
    image: {
        src:{
            type: String,
            required: true
        },
        publicId:{
            type: String,
            required: true
        }
    },
    followersCount:{
        type: Number,
        default: 0
    },
    monthlyListeners:{
        type: Number,
        default: 0
    },
    tracks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    album:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    followed:{
        artist:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Artist'
        }],
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    likedTracks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
    }],
    savedPlaylist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Playlist'
    }]
},
{
    timestamps: true
})

const Artist = mongoose.model( 'Artist' , artistSchema );
export default Artist;