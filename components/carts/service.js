// tầng giao tiếp vs database

const cartModel = require('./model');

//Lấy thông tin danh sách đơn hàng
exports.getCarts = async () => {
    const carts = await cartModel.find().populate('userID statusID');
    return carts;
}

//Lấy thông tin chi tiết 1 đơn hàng
exports.getCartById = async (id) => {
    const cart = await cartModel.findById(id);
    return cart;
}

//cập nhật đơn hàng
exports.update = async (id, oder) => {
    await cartModel.findByIdAndUpdate(id, oder);
}