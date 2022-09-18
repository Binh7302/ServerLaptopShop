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
            statusID: item.statusID,
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
    var id = "6326cda6fc13ae18e5000000";
    data = data.filter(item => item.statusID.equals(id));
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
        statusID: oder.statusID,
        total: oder.total,
        createAt: date.format(oder.createAt),
    }
    return oder;
}

exports.update = async (id, oder) => {
    await cartService.update(id, oder);
}

