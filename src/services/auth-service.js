import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export default {
    async register(userData) {

        if (userData.password !== userData.rePassword) {
            throw new Error('Password mismatch!');
        };
        
        const userCount = await User.countDocuments({ filter: userData.email });

        if (userCount > 0) {
            throw new Error('This email already exists!')
        };

        return User.create(userData);
    },
    async login(email, password) {

        // Check if user exists

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid email or password!');
        };

        // Check if the password is correct

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid email or password!');
        };

        // Generate token
        const payload = {
            id: user.id,
            email: user.email,
        }
        // TODO use async option
        const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });


        return token;
    }
}