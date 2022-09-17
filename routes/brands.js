var express = require('express');
var router = express.Router();

const brandsController = require('../components/brands/controller');
const authentication = require('../middle/authentication');
const upload = require('../middle/upload');
/*
* http://localhost:3000/brands
* method: get
* detail: xuất danh sách nhãn hiệu
* author: Bình
* date: 29/8/2022
 */
 router.get('', [authentication.checkLogin],async function(req, res, next){
  //lấy danh sách nhãn hiệu từ database
  const data = await brandsController.getBrands();
  res.render('brands', {brands: data});
});

/*
* http://localhost:3000/brands/add
* method: get
* detail: hiển thị trang thêm nhãn hiệu
* author: Bình
* date: 29/8/2022
*/
router.get('/add',[authentication.checkLogin], async function (req, res, next) {
  // hiển thị trang thêm mới nhãn hiệu
  res.render('add_brand');
});
module.exports = router;

/*
* http://localhost:3000/brands/
* method: post
* detail: thêm mới nhãn hiệu
* author: Bình
* date: 4/9/2022
*/

//middleware
router.post('/', [upload.single('image'), authentication.checkLogin], async function (req, res, next) {
  // thêm mới nhãn hiệu vào database
  let { body, file } = req;
  let image = '';
  if (file) {
    image = `http://192.168.1.253:3000/images/${file.filename}`;
  }
  body = { ...body, image: image };
  await brandsController.insert(body);
  res.redirect('/brands');
});

/*
* http://locahost:3000/brands/:id/edit
* method: get
* detail: lấy thông tin chi tiết 1 nhãn hiệu
* author: Bình
* date: 4/9/2022
*/
router.get('/:id/edit',[authentication.checkLogin], async function (req, res, next) {
  // lấy thông tin chi tiết 1 nhãn hiệu
  const { id } = req.params;
  const brand = await brandsController.getBrandByIdToShowDetail(id);
  console.log( brand);
  res.render('detail_brand', { brand: brand});
});

/*
* http://locahost:3000/brands/:id/edit
* method: post
* detail: cập nhật thông tin nhãn hiệu
* author: Bình
* date: 4/9/2022
*/
router.post('/:id/edit', [upload.single('image'),authentication.checkLogin], async function (req, res, next) {
  // cập nhật nhãn hiệu vào database
  let { body, file, params } = req;
  delete body.image;

  if (file) {
    let image = `http://192.168.1.253:3000/images/${file.filename}`;
    body = { ...body, image: image };
  }
  console.log(params.id, body);
  await brandsController.update(params.id, body);
  res.redirect('/brands');
});

/*
* http://localhost:3000/brands/:id/delete
* method: delete
* detail: xóa 1 nhãn hiệu
* author: Bình
* date: 4/9/2022
*/
router.delete('/:id/delete',[authentication.checkLogin], async function (req, res, next) {
  // thêm mới sản phẩm vào database
  const { id } = req.params;
  await brandsController.delete(id);

  res.json({ result: true });
});