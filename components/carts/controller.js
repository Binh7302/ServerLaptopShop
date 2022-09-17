// tầng giao tiếp và xử lý data

const cartService = require('./service');
const date = require('../../utils/format_date');

// Lấy danh sách đơn hàng
exports.getCarts = async () => {
    let data = await cartService.getCarts();
    data = data.map((item, index) => {
        item = {
            _id: item._id,
            userID: item.userID,
            status: item.status,
            total: item.total,
            createAt: date.format(item.createAt),
            index: index + 1,
        }
        return item;
    });
    return data;
}

// Lấy danh sách đơn hàng cần xử lý
exports.getOdersForProcessing = async () => {
    let data = await cartService.getCarts();
    data = data.filter(item => item.status == 0);
    data = data.map((item, index) => {
        item = {
            _id: item._id,
            userID: item.userID,
            address: item.address,
            total: item.total,
            createAt: date.format(item.createAt),
            index: index + 1,
        }
        return item;
    });
    return data;
}

// Lấy chi tiết đơn hàng
exports.getOdersById = async (id) => {
    let oder = await cartService.getCartById(id);
    oder = {
        _id: oder._id,
        userID: oder.userID,
        address: oder.address,
        status: oder.status,
        total: oder.total,
        createAt: date.format(oder.createAt),
    }
    return oder;
}

exports.update = async (id, oder) => {
    await cartService.update(id, oder);
}

