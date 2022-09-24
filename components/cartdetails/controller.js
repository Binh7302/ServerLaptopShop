const cartdetailService = require('./service');

exports.top10ProductsAndAmount = async () => {
    const top10ProductsAndAmount = await cartdetailService.gettop10ProductsAndAmount();
    return top10ProductsAndAmount;
}
exports.top10UsersAndAmount = async() => {
    const top10UsersAndAmount = await cartdetailService.getTop10UsersAndAmount();
    return top10UsersAndAmount;
}

// Lấy chi tiết đơn hàng
exports.getCartDetailById = async (id) => {
    let data = await cartdetailService.getCartDetails();
    data = data.filter(item => item.cartID.equals(id));
    data = data.map((item, index) => {
        item = {
            _id: item._id,
            productID: item.productID,
            cartID: item.cartID,
            amount: item.amount,
            quantityPurchased: item.quantityPurchased,
            index: index + 1,
        }
        return item;
    });
    return data;
}