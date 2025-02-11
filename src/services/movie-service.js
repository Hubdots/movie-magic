import Movie from '../models/Movie.js';

export default {
    getOne(movieId) {
        const result = Movie.findById(movieId);
        return result;
    },
    getOneWithCasts(movieId) {
        return this.getOne(movieId).populate('casts.cast');
    },
    create(movieData, creatorId) {

        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId,
        });


        return result;
    },
    getAll(filter = {}) {

        let query = Movie.find({});

        if (filter.search) {
            // TO DO: Fix partial case-insensitive search
            query = query.where({ title: filter.search });
        };

        if (filter.genre) {
            // Add case insensitive search
            query = query.where({ genre: filter.genre });
        };

        if (filter.year) {
            query = query.where({ year: Number(filter.year) })
        };

        return query;
    },

    async attachCast(movieId, castId, character) {

        //Check if castId is not added already.

        // Attach #1
        // const movie = await Movie.findById(movieId);
        // if (movie.casts.includes(castId)) {
        //     return;
        // }
        // movie.casts.push(castId);
        // await movie.save();

        // return movie;

        // Attach #2

        return Movie.findByIdAndUpdate(movieId, {
            $push: {
                casts: {
                    cast: castId,
                    character
                }
            }
        });
    }
} 