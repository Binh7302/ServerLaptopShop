var express = require('express');
var router = express.Router();

const cartDetailController = require('../components/cartdetails/controller');
const authentication = require('../middle/authentication');

/*
* http://localhost:3000/statistic
* method: get
* detail: xuất danh sách top 10 sản phẩm và khách hàng
* author: Phát
* date: 29/8/2022
*  [authentication.checkLogin]
*/
router.get('',[authentication.checkLogin], async function(req, res, next){
    const top10ProductsAndAmount = await cartDetailController.top10ProductsAndAmount();
    const top10UsersAndAmount = await cartDetailController.top10UsersAndAmount();
    res.render('statistic', { top10UsersAndAmount: top10UsersAndAmount, top10ProductsAndAmount: top10ProductsAndAmount });
  });

  module.exports = router;