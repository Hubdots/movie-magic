import Movie from '../models/Movie.js';

export default {
    getOne(movieId) {
        const result = Movie.findById(movieId);
        return result;
    },
    getOneWithCasts(movieId) {
        return this.getOne(movieId).populate('casts');
    },
    create(movieData) {
        
        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
        });
     

        return result;
    },
    getAll(filter = {}) {

        let query = Movie.find({});

        if (filter.search) {
            // TO DO: Fix partial case-insensitive search
            query = query.where({title: filter.search});
        };

        if (filter.genre) {
            // Add case insensitive search
            query = query.where({genre: filter.genre});
        };

        if (filter.year) {
            query = query.where({year: Number(filter.year)})
        };

        return query;
    },

    async attachCast(movieId, castId){

        // Attach #1

        const movie = await Movie.findById(movieId);
        movie.casts.push(castId);
        await movie.save();

        return movie;
    }
}