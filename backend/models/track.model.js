import mongoose from "mongoose";

const trackSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artists: [{
        type: mongoose.Types.ObjectId,
        ref: 'Artist'
    }],
    album: {
        type: mongoose.Types.ObjectId,
        ref: 'Album'
    },
    duration:{
        type: String,
        default: '00:00:00',
        required: true,
        match: /^[0-9]+(:[0-5][0-9]){2}$/
    },
    genre: [{
        type: String,
    }],
    audio:{
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
        imagePublicId:{
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