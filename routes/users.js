var express = require('express');
var router = express.Router();

const authentication = require('../middle/authentication');

const userController = require('../components/users/controller');

/**
 * http://localhost:3000/users
* method: get
* detail: xuất danh sách khách hàng
* author: Bình
* date: 29/8/2022
 */
 router.get('', [authentication.checkLogin],async function(req, res, next){
  res.render('users');
});

/**
 * http://localhost:3000/users/forgotPassword
* method: post
* detail: gửi link reset password vào email
* author: Phát
* date: 5/9/2022
 */
router.post('/forgotPassword', async function(req, res, next){
  const email = req.body.email;
  await userController.forgotPassword(email);
});

/**
 * http://localhost:3000/users/resetPassword
* method: post
* detail: hiển thị trang đổi mật khẩu
* author: Phát
* date: 5/9/2022
 */
router.post('/resetPassword', async function(req, res, next){
  const { resetLink, newPass} = req.body;
  await userController.resetPassword(resetLink, newPass);
});

module.exports = router;
