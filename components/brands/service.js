// tầng giao tiếp vs database

const brandModel = require('./model');

//Lấy thông tin danh sách nhãn hiệu
exports.getBrands = async () => {
    const brands = await brandModel.find();
    return brands;
}

//Lấy thông tin chi tiết 1 nhãn hiệu
exports.getBrandsById = async (id) => {
    // const brand = data.filter(item => item._id == id)[0];
    // return brand;
    const brand = await brandModel.findById(id);
    return brand;
}

//thêm mới nhãn hiệu
exports.insert = async (brand) => {
    const b = new brandModel(brand);
    await b.save();
}


//xóa nhãn hiệu
exports.delete = async (id) => {
    await brandModel.findByIdAndDelete(id);
}


//cập nhật nhãn hiệu
exports.update = async (id, brand) => {
    await brandModel.findByIdAndUpdate(id, brand);
}