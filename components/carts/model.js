const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartSchema = new Schema({
    id: { type: ObjectId },
    userID: { type: Schema.Types.ObjectId, ref: 'user' },
    address: { type: String },
    status: { type: Number },
    total: { type: Number },
    createAt: { type: Date },
});

module.exports = mongoose.model('cart', cartSchema);