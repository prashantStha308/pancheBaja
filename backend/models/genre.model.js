import mongoose from "mongoose";
import validator from 'validator';
import {
	emptyError,
	enumError,
	maxCharError,
	requiredError,
	urlError
} from "../utils/errors.js";

const GenreSchema = new mongoose.Schema({
	name:{
		type: String,
		required: [true, requiredError('genre.name')],
		trim: true,
		unique: true,
        minlength: [1,  emptyError('playlist.name')],
        maxlength: [50,  maxCharError('playlist.name' , 50)]
	},
	slug:{
		type: String,
		unique: true,
		lowercase: true,
		trim: true
	},
	description: {
		type: String,
		trim: true,
		maxlength: [500, maxCharError('genre.description', 500)],
		default: ""
	},
	coverArt:{
        src:{
            type: String,
            default: "https://res.cloudinary.com/dww0antkw/image/upload/v1747984790/deafultImg_woxk8f.png",
            validate: {
                validator: validator.isURL,
                message:  urlError('genre.coverArt.src')
            }
        },
        publicId:{
            type: String,
            default: ""
        }
	},
	color: {
		type: String,
		default: "#1DB954",
		match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid hex color']
	},
	trackCount: {
		type: Number,
		default: 0,
		min: 0
	},
	playlistCount: {
		type: Number,
		default: 0,
		min: 0
	}

},
{
	timstamps: true
})

GenreSchema.index({name: 'text'});

GenreSchema.pre('save', function (next){
	if(this.isModified('name')){
		this.slug = this.name.split(' ').join('-').toLowerCase();
	}

	next();
})


const Genre = mongoose.model('Genre', GenreSchema);

export default Genre;