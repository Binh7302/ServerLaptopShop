// tầng giao tiếp và xử lý data

// import service
const userService = require('./service');

// import thư viện mã hóa
const bcrypt = require('bcryptjs');

// import thư viện token
const jwt = require('jsonwebtoken');

//import thư viện gửi mail
const mailgun = require("mailgun-js");
const { response } = require('express');
const DOMAIN = 'sandboxa6e7868c1f664546a7f8d5994a474cc1.mailgun.org';
const mg = mailgun({ apiKey: 'e6fac5e7c42e61e8bc09b8fb3856183e-07a637b8-5f4b5cea', domain: DOMAIN });

// controller đăng nhập
exports.loginWeb = async (username, password) => {
    const user = await userService.login(username);
    if (!user) return null;
    if (user.role != 1) return null;
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return null;
    return { _id: user._id, username: user.username }
}

exports.loginApp = async (username, password) => {
    const user = await userService.login(username);
    if (!user) return null;
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) return null;
    return { _id: user._id, username: user.username }
}

// controller đăng kí
exports.registerAdmin = async (username, password, confirm_password, name, email, phonenumber) => {
    // bắt lỗi
    if (password != confirm_password) return null;
    let user1 = await userService.login(username);
    if (user1) return null;
    let user2 = await userService.findUserByEmail(email);
    if (user2) return null;
    // tạo link gửi về email để kích hoạt tài khoản
    const token = await jwt.sign({ username: username, password: password, name: name, email: email, phonenumber: phonenumber }, 'activeAccount', { expiresIn: '5m' });
    const data = {
        from: 'laptopshop@gmail.com',
        to: email,
        subject: 'Active Your Account',
        html: `
                    <h2>This link just expires in 5 minutes. Please click on the given link to acctive your account</h2>
                    <p>${'http://localhost:3000'}/users/activeAdminAccount/${token}</p>
                `
    };
    mg.messages().send(data, function (error, body) {
        console.log(error);
        console.log(body);
    });
    return 'Active account link has been sent successfully to your email address';
}

exports.registerUser = async (username, password, confirm_password, name, email, phonenumber) => {
    // bắt lỗi
    if (password != confirm_password) return null;
    let user = await userService.login(username);
    if (user) return null;
    let user2 = await userService.findUserByEmail(email);
    if (user2) return null;

    const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
    user = await userService.registerUser(username, hash, name, email, phonenumber);
    return { _id: user._id };
}

//controller quên mật khẩu
exports.forgotPassword = async (email) => {
    const user = await userService.findUserByEmail(email);
    // bắt lỗi không tìm thấy user
    if (!user) return 'User not found';
    // bắt lỗi khi token resetLink còn hạn sử dụng
    console.log("resetLink: " + user.resetLink);
    if (!user.resetLink) {
        const token = await jwt.sign({ id: user._id }, 'forgot', { expiresIn: '5m' });
        const data = {
            from: 'laptopshop@gmail.com',
            to: email,
            subject: 'Reset Passwords',
            html: `
                    <h2>This link just expires in 5 minutes. Please click on the given link to reset your password</h2>
                    <h3>Here your token to reset password: ${token}</h3>
                    <p>${'http://localhost:3000'}/users/resetPassword</p>
                `
        };
        userService.updateLink(email, token);
        mg.messages().send(data, function (error, body) {
            console.log(error);
            console.log(body);
        });
        return 'link reset password is created successfully';
    } else {
        await jwt.verify(user.resetLink, 'forgot', async function (error, decoded) {
            console.log("error1: " + error);
            if (error != null) {
                const token = await jwt.sign({ id: user._id }, 'admin', { expiresIn: '5m' });
                const data = {
                    from: 'laptopshop@gmail.com',
                    to: email,
                    subject: 'Reset Passwords',
                    html: `
                        <h2>This link just expires in 5 minutes. Please click on the given link to reset your password</h2>
                        <h3>Here your token to reset password: ${token}</h3>
                        <p>${'http://localhost:3000'}/users/resetPassword</p>
                    `
                };
                userService.updateLink(email, token);
                mg.messages().send(data, function (error, body) {
                    console.log(error);
                    console.log(body);
                });
                return 'link reset password is created successfully';
            } else {
                return 'Link reset password has already been sent to your email address';
            }
        });
    }
}

// controller reset password
exports.resetPassword = async (resetLink, newPass, confirmedPass) => {
    if (newPass != confirmedPass) {
        return false;
    } else {
        jwt.verify(resetLink, 'forgot', async function (error, decoded) {
            console.log("error2 " + error);
            if (error != null) {
                return false;
            } else {
                const user = await userService.findUserByResetLink(resetLink);
                const hash = await bcrypt.hash(newPass, await bcrypt.genSalt(10));
                await user.updateOne({ password: hash });
                return true;
            }
        })
    }
}

//controller active account
exports.activeAdminAccount = async (token) => {
    console.log(token);
    if (token) {
        jwt.verify(token, 'activeAccount', async function (err, decoded) {
            const { username, password, email, phonenumber, name } = decoded;
            const hash = await bcrypt.hash(password, await bcrypt.genSalt(10));
            user = await userService.registerAdmin(username, hash, name, email, phonenumber);
            return { _id: user._id };
        })
    } else {
        return false;
    }
}

// Lấy danh sách user
exports.getUsers = async () => {
    let data = await userService.getUsers();
    data = data.filter(item => item.role != 1);
    data = data.map((item, index) => {
        item = {
            _id: item._id,
            name: item.name,
            email: item.email,
            phonenumber: item.phonenumber,
            index: index + 1,
        }
        return item;
    });
    return data;
}

// Lấy thông tin khách hàng theo id 
exports.getUsersById = async (id) => {
    let user = await userService.getUsersById(id);
    user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        phonenumber: user.phonenumber,
    }
    return user;
}