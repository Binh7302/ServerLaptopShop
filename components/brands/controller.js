// tầng giao tiếp và xử lý data

const brandService = require('./service');

// Lấy thông tin nhãn hiệu cho spinner
exports.getBrandsForSpinner = async () => {
    const data = await brandService.getBrands();
    return data;
}

// Lấy danh sách nhãn hiệu
exports.getBrands = async () => {
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

// Lấy thông tin nhãn hiệu theo id (ko sử dụng)
exports.getBrandsById = async (id) => {
    return await brandService.getBrandsById(id);
}

// Lấy thông tin nhãn hiệu theo id để show chi tiết nhãn hiệu
exports.getBrandByIdToShowDetail = async (id) =>{
    let brand = await brandService.getBrandsById(id);
    brand = {
        _id: brand._id,
        name: brand.name,       
        image: brand.image,
    }
    return brand;
}

// Lấy thông tin nhãn hiệu cho chi tiết 1 sản phẩm
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

exports.insert = async (body) => {
    await brandService.insert(body);
}

exports.delete = async (id) => {
    await brandService.delete(id);
}

exports.update = async (id, brand) => {
    await brandService.update(id, brand);
}