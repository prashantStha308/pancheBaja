import mongoose from "mongoose";

const trackSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    artists: [{
        type: String,
        default: 'Unknown Artist',
        trim: true
    }],
    album: {
        type: String,
        default: 'Unknown Album'
    },
    genre: [{
        type: String
    }],
    audioUrl:{
        type: String,
        required: true
    },
    audioPublicId:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        default: null
    },
    imagePublicId:{
        type: String,
        default: null
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