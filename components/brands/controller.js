// tầng giao tiếp và xử lý data

const brandService = require('./service');

exports.getBrands = async () => {
    // const data = await brandService.getBrands();
    // return data;
    let data = await brandService.getBrands();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            name: item.name,       
            image: item.image,
            index: index + 1,
        }
        return item;
    });
    return data;
}

exports.getBrandsById = async (id) => {
    return await brandService.getBrandsById(id);
}

exports.getBrandsForOneProduct = async (selectedId) => {
    let brands = await brandService.getBrands();
    brands = brands.map(item => {
        item = {
            _id: item._id,
            name: item.name,
            image: item.image,
            selected: item._id.toString() == selectedId.toString()
        }
        return item;
    })
    return brands;
}