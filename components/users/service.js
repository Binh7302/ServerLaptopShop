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

exports.updateLink = async (email, link) => {
    console.log("check link: " + link, " email: " + email);
    const user = await userModel.findOne({ email: email },  'id username role password name email phonenumber');
    console.log("check user: " + user );
    await user.updateOne({ resetLink: link });
}

exports.forgotPassword = async (email) => {
    const user = await userModel.findOne({ email: email },  'id username role password name email phonenumber');
    return user;
}

exports.findUserByResetLink = async (resetLink) => {
    const user = await userModel.findOne({ resetLink: resetLink });
    return user;
}