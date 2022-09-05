// tầng giao tiếp và xử lý data

// import service
const userService = require('./service');

// import thư viện mã hóa
const bcrypt = require('bcryptjs');

// import thư viện token
const jwt = require('jsonwebtoken');

//import thư viện gửi mail
const mailgun = require("mailgun-js");
const DOMAIN = 'sandboxa6e7868c1f664546a7f8d5994a474cc1.mailgun.org';
const mg = mailgun({apiKey: 'e6fac5e7c42e61e8bc09b8fb3856183e-07a637b8-5f4b5cea', domain: DOMAIN});

// controller đăng nhập
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

// controller đăng kí
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

//controller quên mật khẩu
exports.forgotPassword = async (email) => {
    const user = await userService.forgotPassword(email);
    if(!user) return null;
    const token = jwt.sign({ id: user._id }, 'admin', {expiresIn: '20m'});
    const data = {
        from: 'laptopshop@gmail.com',
	    to: email,
	    subject: 'Reset Passwords',
	    html: `
            <h2>Please click on the given link to reset your password</h2>
            <p>${'http://localhost:3000'}/users/forgotPassword/${token}</p>
        `
    };
    userService.updateLink(email, token);
    mg.messages().send(data, function (error, body) {
        console.log(error);
        console.log(body);
    });
}

// controller reset password
exports.resetPassword = async (resetLink, newPass) => {
    const user = await userService.findUserByResetLink(resetLink);
    const hash = await bcrypt.hash(newPass, await bcrypt.genSalt(10));
    await user.updateOne({password: hash});
}