// tầng giao tiếp vs database

const userModel = require('./model');

exports.login = async (username) => {
    const user = await userModel.findOne({ username: username }, 'id username role password name email phonenumber');
    return user;
}

exports.registerAdmin = async (username, password, name, email, phonenumber) => {
    const user = new userModel({ username, role: 1 , password, name, email, phonenumber, actived: false });
    return await user.save();
}

exports.registerUser = async (username, password, name, email, phonenumber) => {
    const user = new userModel({ username, role: 0, password, name, email, phonenumber, actived: false });
    return await user.save();
}

exports.updateLink = async (email, link) => {
    const user = await userModel.findOne({ email: email },  'id username role password name email phonenumber resetLink');
    await user.updateOne({ resetLink: link });
}

exports.findUserByEmail = async (email) => {
    const user = await userModel.findOne({ email: email },  'id username role password name email phonenumber resetLink');
    return user;
}

exports.findUserByResetLink = async (resetLink) => {
    const user = await userModel.findOne({ resetLink: resetLink });
    return user;
}

//Lấy thông tin danh sách user
exports.getUsers = async () => {
    const users = await userModel.find();
    return users;
}

//Lấy thông tin chi tiết 1 khách hàng
exports.getUsersById = async (id) => {
    const user = await userModel.findById(id);
    return user;
}

