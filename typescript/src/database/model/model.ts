import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    created: Date
});

export default (conn: mongoose.Connection) => (User)