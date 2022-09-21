const cartdetailModel = require('./model');
const cartModel = require('../carts/model');
const userModel = require('../users/model');
const statusModel = require('../status/model');
const productModel = require('../products/model');

exports.gettop10ProductsAndAmount = async() => {
  //Lấy statusID của status "Đang được giao"
  const status = await statusModel.findOne({ name: 'Đang giao hàng'});
  //Lấy danh sách các giỏ hàng đang được giao 
  const carts = await cartModel.aggregate(
    [
      {$match: {statusID: status._id}},
      {$group: {_id: "$_id"}}
    ]
  );
  //Tạo 1 array để chứa productid
  const ProductID = [];
  //dùng vòng lặp for để push tất cả các id của giỏ hàng đang đc giao vào array
  for (let index = 0; index < carts.length; index++) {
    //tạo 1 biến tạm
    let flag = [];
    //gắn giá trị vào biến tạm(có thể là 1 object array)
    flag = await cartdetailModel.aggregate(
      [
        {$match: {cartID: carts[index]._id}},
        {$group: {_id: "$productID", amount: {$sum: "$quantityPurchased"}}}
      ]
    )
    //dùng vòng lặp for lấy từng item của array để push vào array chứa productid
    for (let index = 0; index < flag.length; index++) {
      ProductID.push(flag[index]);
    }
  }
  //sắp xếp array theo thứ tự giảm dần của số lượng và lấy ra 10 id sản phẩm có số lượng mua nhiều nhất
  ProductID.sort(function (a, b) { return a.amount - b.amount });
  const top10ProductIDandAmount = [];
  let count = 0;
  for (let index = ProductID.length; index >= 0; index--) {
    if(count != 11){
      top10ProductIDandAmount.push(ProductID[index]);
      count++;
    }
  }
  //từ 10 id sp có sơ lượng mua nhiều nhất lấy ra sản phẩm
  const top10Products = [];
  for (let index = 0; index < top10ProductIDandAmount.length; index++) {
    top10Products.push(await productModel.findById(top10ProductIDandAmount[index]));
  }
  //push 10 sản phẩm và số lượng vào array
  const top10ProductsAndAmounnt = [];
  for (let index = 0; index < 10; index++) {
    top10ProductsAndAmounnt.push({ product: top10Products[index], amount: top10ProductIDandAmount[index] });
  }
  top10ProductsAndAmounnt.shift();
  console.log("top 10 products: " + top10ProductsAndAmounnt);
  return top10ProductsAndAmounnt;
}

exports.getTop10UsersAndAmount = async () => {
  const top10UsersIDAndAmount = await cartModel.aggregate(
    [
      {$match: {}},
      {$group: {_id: "$userID", amount: {$sum: "$total"}}},
      {$limit: 10},
      {$sort: {amount: -1}}
    ]
  );
  const top10Users = [];
  for (let index = 0; index < top10UsersIDAndAmount.length; index++) {
    top10Users.push(await userModel.findById(top10UsersIDAndAmount[index]._id));
  }
  const top10UsersAndAmount = [];
  for (let index = 0; index < 10; index++) {
    top10UsersAndAmount.push({ user: top10Users[index], amount: top10UsersIDAndAmount[index] });
  }
  console.log("top users: " + top10UsersAndAmount);
  return top10UsersAndAmount;
}