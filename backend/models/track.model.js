import mongoose from "mongoose";

const trackSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artists: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist'
    }],
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
    },
    duration:{
        type: Number,
        required: true,
        default: 0
    },
    genre: [{
        type: String,
    }],
    track:{
        src:{
            type: String,
            required: true
        },
        publicId: {
            type: String,
            required: true
        }
    },
    image:{
        src:{
            type: String,
            default: null
        },
        publicId:{
            type: String,
            default: null
        }
    },
    type:{
        type: String,
        default: 'track'
    },
    likes:{
        type: Number,
        default: 0
    },
    plays:{
        type: Number,
        default: 0
    }
},
{
    timestamps: true
});

const Track = mongoose.model('Track', trackSchema);
export default Track;