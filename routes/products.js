var express = require('express');
var router = express.Router();

const authentication = require('../middle/authentication');
/*
* http://localhost:3000/products
* method: get
* detail: xuất danh sách sản phẩm
* author: Bình
* date: 29/8/2022
*/
 router.get('', [authentication.checkLogin],async function(req, res, next){
  res.render('products');
});

/*
* http://localhost:3000/products/add
* method: get
* detail: hiển thị trang thêm sản phẩm
* author: Bình
* date: 29/8/2022
*/
router.get('/add',[authentication.checkLogin], async function (req, res, next) {
  // thêm mới sản phẩm vào database
  // const brands = await categoryController.getCategories();
  res.render('add_product');
});



module.exports = router;
