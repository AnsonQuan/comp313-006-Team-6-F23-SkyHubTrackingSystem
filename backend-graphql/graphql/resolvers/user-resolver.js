const user = require("../models/user");

//Registers a user
const addUser = async (root, params) => {
  const userModel = new user(params);
  const newUser = await userModel.save();
  if (!newUser) {
    throw new Error("Error");
  }
  return newUser;
};

const getUsers = async () => {
  const users = await user.find().exec();
  if (!users) {
    throw new Error("Error");
  }
  return users;
};

const getUserById = async (root, params) => {
  const userFound = await user.findById(params.id).exec();
  if (!userFound) {
    throw new Error("Error");
  }
  return userFound;
};

const updateUser = async (root, params) => {
  const updatedUser = await user.findByIdAndUpdate(params.id, params).exec();
  if (!updatedUser) {
    throw new Error("Error");
  }
  return updatedUser;
};

module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUser,
};
