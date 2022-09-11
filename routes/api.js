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


// lay ds sp theo brandID
// http://localhost:3000/api/get-product-by-brand/idbrand
router.get("/get-product-by-brandID/:brandID/", apiController.getProductByBrandID);

// lay ds brand
// http://localhost:3000/api/get-all-brand/
router.get("/get-all-brand/", apiController.getAllBrand);

// tim kiem
// http://localhost:3000/api/get-product-search-with-brandID/:brandID?search=tênsảnphẩm
router.get("/get-product-search-with-brandID/:brandID/", apiController.getSearchProductWithBrand);

// tim user theo username
// http://localhost:3000/api/get-user-by-username?username=
router.get("/get-user-by-username", apiController.getOneUserByUsername);

// cap nhat user
// http://localhost:3000/api/update-user/:id
router.put("/update-user/:id", apiController.updateUser);

// doi mat khau
// http://localhost:3000/api/update-user-pass/:id
router.put("/update-user-pass/:id", apiController.updatePass);

// them moi cart
// http://localhost:3000/api/add-cart/
router.post("/add-cart/", apiController.addCart);

// them moi cartDetail
// http://localhost:3000/api/add-cartDetail/
router.post("/add-cartDetail/", apiController.addCartDetail);

// lay 1 cat theo id
// http://localhost:3000/api/get-one-cart/ idcart
router.get("/get-one-cart/:cartID/", apiController.getOneCart);

// lay ds cart cho ds lich su mua hang
// http://localhost:3000/api/get-all-cart/ userID
router.get("/get-all-cart/:userID", apiController.getAllCart);

// lay ds cartDetail theo cartID
// http://localhost:3000/api/get-all-cartDetail/ idcart
router.get("/get-all-cartDetail/:cartID/", apiController.getAllCartDetail);
 
module.exports = router;