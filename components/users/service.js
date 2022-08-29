// tầng giao tiếp vs database

const userModel = require('./model');

exports.login = async (username) => {
    const user = await userModel.findOne({ username: username }, 'id username role password name email phonenumber');
    return user;
}

exports.registerAdmin = async (username, password, name, email, phonenumber) => {
    const user = new userModel({ username, role: 1 , password, name, email, phonenumber });
    return await user.save();
}

exports.registerUser = async (username, password, name, email, phonenumber) => {
    const user = new userModel({ username, role: 0, password, name, email, phonenumber });
    return await user.save();
}