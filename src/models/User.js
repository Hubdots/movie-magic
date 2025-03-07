import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        match: /\@[a-zA-Z]+.[a-zA-Z]+$/,
        minLength: 10,
    },
    password: {
        type: String,
        match: /^\w+$/,
        minLength: [6, 'Password should be at least 6 charcters!'],
    },
});

userSchema.virtual('rePassword')
    .set(function (rePassword) {
        if (rePassword !== this.password) {
            throw new Error('Password mismatch!');
        }
    })

userSchema.pre('save', async function () {
    // TODO: fix update user bug
    this.password = await bcrypt.hash(this.password, 10);
})

const User = model('User', userSchema);

export default User;