const { Product, User } = require("../api/apiModel");
const { Image } = require("../api/apiModel");
const { Brand } = require("../api/apiModel");
const { Cart } = require("../api/apiModel");
const { CartDetail } = require("../api/apiModel");
const bcrypt = require('bcryptjs');


const apiController = {

    addProduct: async (req, res) => {
        try {
            const newProduct = new Product(req.body);
            const saveProduct = await newProduct.save();
            res.status(200).json(saveProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // lay tat ca product
    getAllProduct: async (req, res) => {
        try {
            const products = await Product.find({ status: 1 });
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // lay tat ca image theo productID
    getImageByProductID: async (req, res) => {
        try {
            const images = await Image.find({ productID: req.params.productID });
            res.status(200).json(images);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // lay 1 product theo id
    getOneProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // tìm kiếm
    getSearchProduct: async (req, res) => {
        try {
            const search = req.query.search;
            const products = await Product.find({ name: { $regex: search, $options: "$i" }, status: 1 });
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // lấy 1 brand theo id
    getOneBrand: async (req, res) => {
        try {
            const brand = await Brand.findById(req.params.brandID);
            res.status(200).json(brand);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    // lay tat ca brand
    getAllBrand: async (req, res) => {
        try {
            const brands = await Brand.find();
            res.status(200).json(brands);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // lấy ds sp theo brandID
    getProductByBrandID: async (req, res) => {
        try {
            const brandID = req.params.brandID;
            const products = await Product.find({ brand: brandID, status: 1 });
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // tìm kiếm voi brand
    getSearchProductWithBrand: async (req, res) => {
        try {
            const search = req.query.search;
            const brandID = req.params.brandID;
            const products = await Product.find({ name: { $regex: search, $options: "$i" }, status: 1, brand: brandID });
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // tim user theo username
    getOneUserByUsername: async (req, res) => {
        try {
            const username = req.query.username;
            const user = await User.findOne({ username: username });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // cap nhat user
    updateUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            await user.updateOne({ $set: req.body });
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // doi mat khau
    updatePass: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            const newUser = req.body;

            newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10));
            await user.updateOne({ $set: newUser });
            res.status(200).json("Updated successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add cart
    addCart: async (req, res) => {
        try {
            const newCart = new Cart(req.body);
            const saveCart = await newCart.save();
            res.status(200).json(saveCart);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add cart detail
    addCartDetail: async (req, res) => {
        try {
            const newCartDetail = new CartDetail(req.body);
            const saveCartDetail = await newCartDetail.save();
            res.status(200).json(saveCartDetail);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // lấy 1 cart
    getOneCart: async (req, res) => {
        try {
            const cart = await Cart.findById(req.params.cartID);
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json(err);
        }
    },


    // lay tat ca cart cho ds lich su mua hang
    getAllCart: async (req, res) => {
        try {
            const carts = await Cart.find({userID: req.params.userID});
            res.status(200).json(carts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // lay tat ca brand
    getAllCartDetail: async (req, res) => {
        try {
            const cartDetails = await CartDetail.find({cartID: req.params.cartID});
            res.status(200).json(cartDetails);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = apiController;


