var express = require('express');
var router = express.Router();

const authentication = require('../middle/authentication');
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

module.exports = router;