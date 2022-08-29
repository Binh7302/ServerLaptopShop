var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');
const userController = require('../components/users/controller');

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

module.exports = router;