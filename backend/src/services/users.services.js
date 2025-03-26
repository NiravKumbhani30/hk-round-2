const UserModel = require("../models/User.model");

exports.getAllUsers = async ({ page, limit }) => {
    try {
        const users = await UserModel.find().sort({ createdAt: -1 })
            .skip(Number(page) * limit)
            .limit(Number(limit))
            .lean();
        return users;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getUserById = async (id) => {
    try {
        const user = await UserModel.findById(id);
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getAllUsersCount = async () => {
    try {
        const count = await UserModel.countDocuments();
        return count;
    } catch (error) {
        throw new Error(error);
    }
};

exports.getUserByEmail = async (email) => {
    try {
        const user = await UserModel.findOne({ email });
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

exports.createUser = async (user) => {
    try {
        const newUser = await UserModel.create(user);
        return newUser;
    } catch (error) {
        throw new Error(error);
    }
};
