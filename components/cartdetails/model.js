const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const cartdetailSchema = new Schema({
    quantityPurchased: {
        type: Number
    },
    amount: {
        type: Number
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products"
    },
    cartID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    }
});

module.exports = mongoose.model('cartdetail', cartdetailSchema);