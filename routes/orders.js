var express = require('express');
var router = express.Router();

const authentication = require('../middle/authentication');
const oderController = require('../components/carts/controller');
const userController = require('../components/users/controller');
const upload = require('../middle/upload');

/*
* http://localhost:3000/oders
* method: get
* detail: xuất danh sách đơn hàng
* author: Bình
* date: 29/8/2022
*/
 router.get('', [authentication.checkLogin],async function(req, res, next){
  const data = await oderController.getCarts();
  res.render('oders', {oders: data});
});

/*
* http://localhost:3000/oders/odersProcessing
* method: get
* detail: xuất danh sách đơn hàng đang xử lý
* author: Bình
* date: 17/9/2022
*/
router.get('/odersProcessing', [authentication.checkLogin],async function(req, res, next){
  const data = await oderController.getOdersForProcessing();
  res.render('odersProcessing', {oders: data});
});

/*
* http://locahost:3000/oders/odersProcessing/:id/edit
* method: get
* detail: lấy thông tin chi tiết 1 đơn hàng
* author: Bình
* date: 17/9/2022
*/
router.get('/odersProcessing/:id/edit',[authentication.checkLogin], async function (req, res, next) {
  // lấy thông tin chi tiết 1 đơn hàng
  const { id } = req.params;
  const oder = await oderController.getOdersById(id);
  const user = await userController.getUsersById(oder.userID._id);
  console.log(oder, user);
  res.render('detail_oder', {oder: oder, user: user});
});

/*
* http://locahost:3000/oders/odersProcessing/:id/edit
* method: post
* detail: cập nhật thông tin đơn hàng
* author: Bình
* date: 17/9/2022
*/
router.post('/odersProcessing/:id/edit', [upload.single('image'),authentication.checkLogin], async function (req, res, next) {
  // cập nhật đơn hàng vào database
  let { body, params } = req;
  console.log(params.id, body);
  await oderController.update(params.id, body);
  res.redirect('/oders/odersProcessing');
});

module.exports = router;
