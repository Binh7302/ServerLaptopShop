const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'brands' },
    quantity: { type: Number },
    description: { type: String },
    status: { type: Number },
    image: { type: String },
});

const brandSchema = new mongoose.Schema({
    name: {
        type: String
    },
    image: {
        type: String
    }
});

const imageSchema = new mongoose.Schema({
    image: {
        type: String
    },
    productID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products' 
    }
});

const cartSchema = new mongoose.Schema({
    UserID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'users' 
    },
    adress: {
        type: String
    },
    status: {
        type: Number
    },
    // createAt: {
    //     type: Date
    // }
});

const cartDetailtSchema = new mongoose.Schema({
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

let Product = mongoose.model("products", productSchema);
let Brand = mongoose.model("brands", brandSchema);
let Image = mongoose.model("images", imageSchema);
let Cart = mongoose.model("cart", cartSchema);
let CartDetail = mongoose.model("cartDetail", cartDetailtSchema);

module.exports = { Product, Cart, CartDetail, Brand, Image };