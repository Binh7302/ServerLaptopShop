const productService = require('./service');

exports.getProducts = async () => {
    let data = await productService.getProducts();
    data = data.map((item,index) => {
        item = {
            _id: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            description: item.description,
            brandID: item.brandID,
            status: item.status,
            index: index + 1,
        }
        return item;
    });
    return data;
}

exports.getProductById = async(id) =>{
    let product = await productService.getProductById(id);
    product = {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
        brand: product.brand,
        status: product.status
    }
    return product;
}

exports.insert = async (body) => {
    await productService.insert(body);
}

exports.delete = async (id) => {
    await productService.delete(id);
}

exports.update = async (id, product) => {
    await productService.update(id, product);
}