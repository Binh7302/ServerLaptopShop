const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    name: { type: String },
    price: { type: Number },
    brandID: { type: Schema.Types.ObjectId, ref: 'brand' },
    quantity: { type: Number },
    description: { type: String },
    status: { type: Number },
});

module.exports = mongoose.model('product', productSchema);