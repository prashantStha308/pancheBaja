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

async function resolveAffiliatedsOnDeletion(next){
	try{
		if(!this.isModified())
			return

		await Promise.allSettled([
			mongoose.model('Track').updateMany(
				{genre: this._id},
				{$pull: {genre: this._id} }
			),
			mongoose.model('Playlist').updateMany(
				{genre: this._id},
				{$pull: {genre: this._id} }
			)
		])

		next();
	}catch(err){
		next(err);
	}
}

GenreSchema.pre('save', function (next){
	if(this.isModified('name')){
		this.slug = this.name.split(' ').join('-').toLowerCase();
	}

	next();
})

GenreSchema.pre('deleteOne',  resolveAffiliatedsOnDeletion);
GenreSchema.pre('findOneAndDelete', resolveAffiliatedsOnDeletion);


const Genre = mongoose.model('Genre', GenreSchema);

export default Genre;