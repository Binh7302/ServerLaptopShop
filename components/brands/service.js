// tầng giao tiếp vs database

const brandModel = require('./model');

exports.getBrands = async () => {
    //return data;
    const brands = await brandModel.find();
    return brands; 
}

exports.getBrandsById = async (id) => {
    const brand = data.filter(item => item._id == id)[0];
    return brand;
}