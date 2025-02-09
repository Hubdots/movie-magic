import express from 'express';
import handlebars from 'express-handlebars';
import mongoose, { mongo } from 'mongoose';
import 'dotenv/config';

import routes from './routes.js'
import showRatingHelper from './helpers/rating-helper.js';

const app = express();

// Db configuration

try {
    const localUri = 'mongodb://localhost:27017/magic-movies';
    await mongoose.connect(process.env.DATABASE_URI ?? localUri);

    console.log('DB connected successfully');

} catch (err) {
    console.log('Cannot connect DB');
    console.error(err.message); 
}

// Handlebars configuration 

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        showRating: showRatingHelper,
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');

// Express configuration

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({ extended: false }));

// Setup routes

app.use(routes);

app.listen(5000, () => console.log('Server is listening on http://localhost:5000....'));