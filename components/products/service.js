// service: tầng giao tiếp với database

const productModel = require('./model');

//Lấy thông tin danh sách sản phẩm
exports.getProducts = async () => {
  // return data;
  const products = await productModel.find().populate('brandID');
  return products;
}


//Lấy thông tin chi tiết 1 sản phẩm
exports.getProductById = async (id) => {
  // const product = data.filter(item => item._id == id)[0];
  // return product;
  const product = await productModel.findById(id).populate('brandID');
  return product;
}


//thêm mới sản phẩm
exports.insert = async (product) => {
  // data.push(product);
  const p = new productModel(product);
  await p.save();
}


//xóa sản phẩm
exports.delete = async (id) => {
  // data = data.filter(item => item._id != id);
  await productModel.findByIdAndDelete(id);
}


//sửa sản phẩm
exports.update = async (id, product) => {
  // data = data.map(item => {
  //   if(item._id == id){
  //     item = {...item,...product}
  //   }
  //   return item;
  // })
  await productModel.findByIdAndUpdate(id, product);
}

var data = [{
  "_id": 41,
  "name": "Dr. Pepper - 355ml",
  "price": 459,
  "quantity": 31,
  "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
  "description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.",
  "category":
  {
    "_id": 1,
    "name": "Nut - Walnut, Pieces",
    "description": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
  },
  "release": "2022-02-24",
}, {
  "_id": 2,
  "name": "Foam Espresso Cup Plain White",
  "price": 404,
  "quantity": 44,
  "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
  "description": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
  "category":
  {
    "_id": 2,
    "name": "Coconut - Whole",
    "description": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.\n\nDonec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus."
  },
  "release": "2021-06-24",
}, {
  "_id": 16,
  "name": "Cod - Fillets",
  "price": 208,
  "quantity": 12,
  "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
  "description": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.",
  "category":
  {
    "_id": 3,
    "name": "Shallots",
    "description": "Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."
  },
  "release": "2021-08-11",
}, {
  "_id": 81,
  "name": "Wine - Magnotta - Cab Franc",
  "price": 310,
  "quantity": 85,
  "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
  "description": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
  "category":
  {
    "_id": 4,
    "name": "Beer - True North Strong Ale",
    "description": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui."
  },
  "release": "2021-05-21",
}, {
  "_id": 3,
  "name": "Cookies - Fortune",
  "price": 265,
  "quantity": 68,
  "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
  "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
  "category":
  {
    "_id": 5,
    "name": "Cheese - Cottage Cheese",
    "description": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat."
  },
  "release": "2021-11-18",
}, {
  "_id": 28,
  "name": "Mustard Prepared",
  "price": 376,
  "quantity": 69,
  "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
  "description": "Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
  "category":
  {
    "_id": 6,
    "name": "Food Colouring - Red",
    "description": "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est."
  },
  "release": "2022-01-06",
}, {
  "_id": 12,
  "name": "Sauce - Soya, Light",
  "price": 177,
  "quantity": 85,
  "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
  "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.",
  "category":
  {
    "_id": 7,
    "name": "Lychee - Canned",
    "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus."
  },
  "release": "2021-11-15",
}, {
  "_id": 38,
  "name": "Mushrooms - Honey",
  "price": 405,
  "quantity": 27,
  "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
  "description": "Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
  "category":
  {
    "_id": 8,
    "name": "Coffee - Egg Nog Capuccino",
    "description": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.\n\nIn quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui."
  },
  "release": "2021-09-28",
}, {
  "_id": 42,
  "name": "Snapple - Mango Maddness",
  "price": 445,
  "quantity": 90,
  "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
  "description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.\n\nCum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
  "category":
  {
    "_id": 9,
    "name": "Spinach - Packaged",
    "description": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem."
  },
  "release": "2021-06-03",
}, {
  "_id": 16,
  "name": "Wine - Chardonnay Mondavi",
  "price": 364,
  "quantity": 73,
  "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
  "description": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.",
  "category": 
  {
    "_id": 9,
    "name": "Spinach - Packaged",
    "description": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem."
  },
  "release": "2021-09-18",
}, {
  "_id": 30,
  "name": "Butter - Salted, Micro",
  "price": 332,
  "quantity": 69,
  "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
  "description": "Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.\n\nCurabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.",
  "category":
  {
    "_id": 10,
    "name": "Chocolate - Feathers",
    "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
  },
  "release": "2021-09-18",
}]
// }, {
//   "_id": 51,
//   "name": "Dried Figs",
//   "price": 112,
//   "quantity": 22,
//   "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
//   "description": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.",
//   "category_id": 3
// }, {
//   "_id": 61,
//   "name": "Shrimp - 100 / 200 Cold Water",
//   "price": 465,
//   "quantity": 85,
//   "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
//   "description": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
//   "category_id": 100
// }, {
//   "_id": 30,
//   "name": "Syrup - Monin, Swiss Choclate",
//   "price": 402,
//   "quantity": 10,
//   "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
//   "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.",
//   "category_id": 33
// }, {
//   "_id": 51,
//   "name": "Bread Sour Rolls",
//   "price": 477,
//   "quantity": 52,
//   "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
//   "description": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.",
//   "category_id": 2
// }, {
//   "_id": 70,
//   "name": "Bread Ww Cluster",
//   "price": 285,
//   "quantity": 69,
//   "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
//   "description": "Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.",
//   "category_id": 17
// }, {
//   "_id": 41,
//   "name": "Pepper - Green Thai",
//   "price": 310,
//   "quantity": 80,
//   "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
//   "description": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.",
//   "category_id": 90
// }, {
//   "_id": 22,
//   "name": "Cheese - Swiss Sliced",
//   "price": 330,
//   "quantity": 99,
//   "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
//   "description": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
//   "category_id": 43
// }, {
//   "_id": 1,
//   "name": "Sugar - White Packet",
//   "price": 277,
//   "quantity": 23,
//   "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
//   "description": "In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
//   "category_id": 57
// }, {
//   "_id": 20,
//   "name": "Wine - Maipo Valle Cabernet",
//   "price": 159,
//   "quantity": 56,
//   "image": "https://image.cellphones.com.vn/358x/media/catalog/product/_/0/_0003_combo_-_reno4_-_blue_-_full_check.jpg",
//   "description": "Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
//   "category_id": 96
// }]