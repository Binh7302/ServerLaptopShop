const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId },
    username: { type: String, required: true },
    role: { type: Number},
    password: { type: String},
    name: { type: String },
    email: { type: String },
    phonenumber: { type: String },
    resetLink: { type: String, required: true}
});

module.exports = mongoose.model('user', userSchema);