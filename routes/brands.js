var express = require('express');
var router = express.Router();

const authentication = require('../middle/authentication');
/*
* http://localhost:3000/brands
* method: get
* detail: xuất danh sách nhãn hiệu
* author: Bình
* date: 29/8/2022
 */
 router.get('', [authentication.checkLogin],async function(req, res, next){
  res.render('brands');
});

/*
* http://localhost:3000/brands/add
* method: get
* detail: hiển thị trang thêm nhãn hiệu
* author: Bình
* date: 29/8/2022
*/
router.get('/add',[authentication.checkLogin], async function (req, res, next) {
  // thêm mới nhãn hiệu vào database
  res.render('add_brand');
});
module.exports = router;
