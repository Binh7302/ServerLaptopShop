var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const userController = require('../components/users/controller');
const apiController = require('../components/api/apiController');
const authentication = require('../middle/authentication');

// http://localhost:3000/api/login
router.post('/login', async function (req, res, next) {
  const { username, password } = req.body;

  // thực hiện kiểm tra đăng nhập
  const result = await userController.loginApp(username, password);
  if (result) {
    // secret key
    const token = jwt.sign({ id: result._id, username: result.username }, 'admin')
    res.json({ status: true, result, token })
  } else {
    res.json({ status: false })
  }
});

// http://localhost:3000/api/register
router.post('/register', async function (req, res, next) {
  const { username, password, confirm_password, name, email, phonenumber } = req.body;

  // thực hiện kiểm tra đăng nhập
  const result = await userController.registerUser(username, password, confirm_password, name, email, phonenumber);
  if (result) {
    res.json({ status: true })
  } else {
    res.json({ status: false })
  }
});




// lay tat ca product
// http://localhost:3000/api/get-all-product
router.get("/get-all-product/", apiController.getAllProduct);


// lay image theo id product
// http://localhost:3000/api/get-image-by-productID/idsảnphẩm
router.get("/get-image-by-productID/:productID", apiController.getImageByProductID);


// lay 1 product
// http://localhost:3000/api/get-one-product/idsảnphẩm
router.get("/get-one-product/:id/", apiController.getOneProduct);


// tim kiem
// http://localhost:3000/api/get-product-search?search=tênsảnphẩm
router.get("/get-product-search/", apiController.getSearchProduct);


// lay 1 brand
// http://localhost:3000/api/get-one-brand/idbrand
router.get("/get-one-brand/:brandID/", apiController.getOneBrand);

 
module.exports = router;