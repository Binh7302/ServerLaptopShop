var express = require('express');
var router = express.Router();

const jwt = require('jsonwebtoken');

const userController = require('../components/users/controller');

const authentication = require('../middle/authentication');

/**
 * http://localhost:3000/login
 * method: get
 * detail: hiển thị trang login
 * author: tấn phát
 * date: 28/08/2022
 */
 router.get('/login', [authentication.checkLogin], function(req, res, next){
  res.render('login');
});

/**
 * http://localhost:3000/login
 * method: post
 * detail: thực hiện đăng nhập
 * author: tấn phát
 * date: 28/08/2022
 */
 router.post('/login', async function(req, res, next){
  const { username, password } = req.body;
  console.log(username+" "+password);
  // thực hiện kiểm tra đăng nhập
  const result = await userController.loginWeb(username,password);
  console.log(result+" check");
  if(result) {
    // secret key
    const token = jwt.sign({ id: result._id, username: result.username }, 'admin')
    req.session.token = token;
    // nếu đúng chuyển qua trang sản phẩm
    res.redirect('/products');
  } else {
    // nếu sai quay trở lại đăng nhập
    res.redirect('/login');
  }
});

/**
 * http://localhost:3000/logout
 * method: get
 * detail: thực hiện đăng xuất
 * author: tấn phát
 * date: 28/08/2022
 */
 router.get('/logout', [authentication.checkLogin], function(req, res, next){
  req.session.destroy(function(err){
   // nếu đăng xuất thành công chuyển qua đăng nhập
   res.redirect('login');
  })
});


/**
 * http://localhost:3000/register
 * method: get
 * detail: hiển thị trang đăng kí
 * author: tấn phát
 * date: 28/08/2022
 */
 router.get('/register', function(req, res, next){
  res.render('register');
});

/**
 * http://localhost:3000/register
 * method: post
 * detail: thực hiện đăng kí
 * author: tấn phát
 * date: 28/08/2022
 */
 router.post('/register', async function(req, res, next){
  const { username, password, confirm_password, name, email, phonnumber } = req.body;

  // thực hiện kiểm tra đăng nhập
  const result = await userController.registerAdmin(username, password, confirm_password, name, email, phonnumber);
  if(result) {
    // nếu đúng chuyển qua trang đăng nhập
    res.redirect('/login');
  } else {
    // nếu sai vẫn ở trang đăng kí
    res.redirect('/register');
  }
});

module.exports = router;
