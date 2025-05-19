import mongoose from "mongoose";

const playlistSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artists: [{
        type: String,
    }],
    trackList: [{
        type: mongoose.Types.ObjectId,
        ref: 'Track'
    }]
},
{
    timestamps: true
})


const Playlist = mongoose.model( 'Playlist' , playlistSchema );
export default Playlist;