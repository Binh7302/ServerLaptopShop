// tầng giao tiếp và xử lý data

const statusService = require('./service');

// Lấy thông tin nhãn hiệu cho spinner
exports.getStatusForSpinner = async () => {
    const data = await statusService.getStatus();
    return data;
}


// Lấy thông tin nhãn hiệu cho chi tiết 1 sản phẩm
exports.getStatusForOneOder = async (selectedId) => {
    let status = await statusService.getStatus();
    status = status.map(item => {
        item = {
            _id: item._id,
            name: item.name,
            selected: item._id.toString() == selectedId.toString()
        }
        return item;
    })
    return status;
}

