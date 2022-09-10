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
   //lấy danh sách user từ database
   const data = await userController.getUsers();
  res.render('users', {users: data});
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
  const result = await userController.forgotPassword(email);
  console.log("result forgotPassword: " + result);
  return res.render('login');
});

/**
 * http://localhost:3000/users/resetPassword
* method: post
* detail: hiển thị trang đổi mật khẩu
* author: Phát
* date: 5/9/2022
 */
router.post('/resetPassword', async function(req, res, next){
  const { resetLink, newPass, confirmedPass } = req.body;
  console.log("token: " + resetLink);
  console.log("newPass: " + newPass);
  console.log("conPass: " + confirmedPass);
  const result = await userController.resetPassword(resetLink, newPass, confirmedPass);
  console.log("result resetPassword: " + result);
  console.log("resetPassword is working");
  if(result == false){

  } else {
    res.render('login');
  }
});

/**
 * http://localhost:3000/users/resetPassword
* method: get
* detail: hiển thị trang đổi mật khẩu
* author: Phát
* date: 5/9/2022
 */
router.get('/resetPassword', async function(req, res, next){
  res.render('resetPassword')
});

/**
 * http://localhost:3000/users/activeAdminAccount/:token
* method: get
* detail: kích hoạt tài khoản admin
* author: Phát
* date: 6/9/2022
 */
router.get('/activeAdminAccount/:token', async function(req, res, next){
  const {token} = req.params;
  const result = userController.activeAdminAccount(token);
  if(result == null){
    res.render('activeFailed');
  } else {
    res.render('activeSuccessfully');
  }
});

module.exports = router;
