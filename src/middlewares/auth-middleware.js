import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export const authMiddleware = (req, res, next) => {

    // Get token
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    };

    // Validate token

    try {
        const decodedToken = jwt.verify(token, SECRET);

        // Attach decoded token to request
        req.user = decodedToken;
        res.locals.user = decodedToken;
        next();

    } catch (error) {
        //TODO: invalid token
        res.setError('Invalid Authentication!');
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
};

export const isAuth = (req, res, next) => {
    if (!req.user) {
        res.setError('You must be logged in order to do that!')
        return res.redirect('/auth/login');
    };

    next();
}