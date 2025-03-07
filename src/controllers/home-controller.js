import express from 'express';
import movieService from '../services/movie-service.js';


const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await movieService.getAll();

    // Convert documents to plain objects
    // const plainMovies = movies.map(m => m.toObject());

    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about', {pageTitle: 'About'});
});

export default router;