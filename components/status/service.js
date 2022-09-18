// tầng giao tiếp vs database

const statusModel = require('./model');

//Lấy thông tin danh sách trạng thái
exports.getStatus = async () => {
    const status = await statusModel.find();
    return status;
}

exports.getStatusById = async (id) => {
    const status = await statusModel.findById(id);
    return status;
}

