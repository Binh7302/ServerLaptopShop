const cartdetailService = require('./service');

exports.top10ProductsAndAmount = async () => {
    const top10ProductsAndAmount = await cartdetailService.gettop10ProductsAndAmount();
    return top10ProductsAndAmount;
}
exports.top10UsersAndAmount = async() => {
    const top10UsersAndAmount = await cartdetailService.getTop10UsersAndAmount();
    return top10UsersAndAmount;
}