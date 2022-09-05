var express = require('express');
var router = express.Router();

const productController = require('../components/products/controller');
const brandController = require('../components/brands/controller');
const authentication = require('../middle/authentication');
const upload = require('../middle/upload');
/*
* http://localhost:3000/products
* method: get
* detail: xuất danh sách sản phẩm
* author: Bình
* date: 29/8/2022
*/
 router.get('', [authentication.checkLogin],async function(req, res, next){
  const data =  await productController.getProducts();
  res.render('products', {products: data});
});

/*
* http://localhost:3000/products/add
* method: get
* detail: hiển thị trang thêm sản phẩm
* author: Bình
* date: 29/8/2022
*/
router.get('/add',[authentication.checkLogin], async function (req, res, next) {
  // hiển thị trang thêm sản phẩm
  const brands = await brandController.getBrandsForSpinner();
  res.render('add_product', {brand: brands});
});

/*
* http://localhost:3000/products/
* method: post
* detail: thêm mới sản phẩm
* author: Bình
* date: 5/9/2022
*/

//middleware
router.post('/', [upload.single('image'), authentication.checkLogin], async function (req, res, next) {
  // thêm mới sản phẩm vào database
  let { body, file } = req;
  let image = '';
  if (file) {
    image = `http://192.168.1.253:3000/images/${file.filename}`;
  }
  body = { ...body, image: image };
  await productController.insert(body);
  res.redirect('/products');
});

/*
* http://locahost:3000/products/:id/edit
* method: get
* detail: lấy thông tin chi tiết 1 sản phẩm
* author: Bình
* date: 5/9/2022
*/
router.get('/:id/edit',[authentication.checkLogin], async function (req, res, next) {
  // lấy thông tin chi tiết 1 nhãn hiệu
  const { id } = req.params;
  const product = await productController.getProductById(id);
  const brand = await brandController.getBrandsForOneProduct(product.brand._id);
  res.render('detail_product', {product: product,brand: brand});
});

/*
* http://locahost:3000/products/:id/edit
* method: post
* detail: cập nhật thông tin sản phẩm
* author: Bình
* date: 4/9/2022
*/
router.post('/:id/edit', [upload.single('image'),authentication.checkLogin], async function (req, res, next) {
  // cập nhật sản phẩm vào database
  let { body, file, params } = req;
  delete body.image;

  if (file) {
    let image = `http://192.168.1.253:3000/images/${file.filename}`;
    body = { ...body, image: image };
  }
  await productController.update(params.id, body);
  res.redirect('/products');
});

/*
* http://localhost:3000/products/:id/delete
* method: delete
* detail: xóa 1 sản phẩm
* author: Bình
* date: 5/9/2022
*/
router.delete('/:id/delete',[authentication.checkLogin], async function (req, res, next) {
  // thêm mới sản phẩm vào database
  const { id } = req.params;
  await productController.delete(id);
  res.json({ result: true });
});

module.exports = router;
