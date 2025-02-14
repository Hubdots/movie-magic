import express from 'express';
import handlebars from 'express-handlebars';
import expressSession from 'express-session';
import mongoose, { mongo } from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import routes from './routes.js'
import showRatingHelper from './helpers/rating-helper.js';
import { authMiddleware } from './middlewares/auth-middleware.js';
import { tempData } from './middlewares/temp-data-middleware.js';

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
app.use(cookieParser());
app.use(expressSession({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true },
}));
app.use(tempData);
app.use(authMiddleware);

// Setup routes

app.use(routes);

app.listen(5000, () => console.log('Server is listening on http://localhost:5000....'));