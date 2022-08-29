// tầng giao tiếp và xử lý data

const userService = require('./service');
const bcrypt = require('bcryptjs');

exports.loginWeb = async (username, password) => {
    const user = await userService.login(username);
    if(!user) return null;
    if(user.role != 1) return null;
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) return null;
    return { _id: user._id, username: user.username }
}

exports.loginApp = async (username, password) => {
    const user = await userService.login(username);
    if(!user) return null;
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) return null;
    return { _id: user._id, username: user.username }
}

exports.registerAdmin = async (username, password, confirm_password, name, email, phonenumber) => {
    if(password != confirm_password) return null;
    let user = await userService.login(username);
    if(user) return null;

    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.registerAdmin(username, hash, name, email, phonenumber);
    return { _id: user._id };
}

exports.registerUser = async (username, password, confirm_password, name, email, phonenumber) => {
    if(password != confirm_password) return null;
    let user = await userService.login(username);
    if(user) return null;

    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.registerUser(username, hash, name, email, phonenumber);
    return { _id: user._id };
}