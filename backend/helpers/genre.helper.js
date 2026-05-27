// Models
import Genre from "../models/genre.model.js";
import Track from "../models/track.model.js";
import Playlist from "../models/playlist.model.js";


/* [GET] */

export const findGenresFromNames = async(genreList, select) => {
    if (!genreList?.length) return [];

    const slugs = genreList.map(g =>
        g.toLowerCase().split(' ').join('-')
    );

    let query = Genre.find({
        slug: { $in: slugs }
    });

    if (select) {
        query = query.select(select);
    }

    return await query.lean().exec();
}

export const findGenreFromName = async (name) => {
	if(!name)
		return;


	const slug = name.toLowerCase().split(' ').join('-');

	const genre = await Genre.findOne({
		slug: {$in: slug}
	}).lean().exec();

	return genre;
}

// ---------------------------------------------------------------------------------------------------------------------

/* [Resolve delete / Handle Docs] */


// ---------------------------------------------------------------------------------------------------------------------
