const user = require("../models/user");
// Import dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "jwt_secret_key"; 
const jwtExpirySeconds = 300;

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

const login = async (root, params, context) => {
  const userInfo = await user.findOne({email: params.email}).exec();
  if (!userInfo){
    console.error('User not found for email: ', params.email);
    return false; // Authentication failed
  }
  try {
  // check if the password is correct
  const isValidPassword = await userInfo.comparePassword(params.password.trim());
  if(!isValidPassword){
    console.error('Invalid password');
    return false; // Authentication failed
  }
    const token = jwt.sign(
      { _id: userInfo._id, email : userInfo.email},
      "jwt_secret_key",
      {algorithm:'HS256', expiresIn:jwtExpirySeconds}
    );

    console.log('Generated token: ', token);
    context.res.cookie('token', token, {maxAge: 300 * 1000, httpOnly: true});
    return true; // Authentication successful
  } catch (error){
    console.error('Authentication failed: ', error);
    return false;
  }
};

const logout = (root, params, context) => {
  context.res.clearCookie('token');
  return true; // Logged out successfully.
} 

const isLoggedIn = (root, params, context) =>{
  const token = context.req.cookies.token;
  if (!token) {
    return false;
  }
  try {
    jwt.verify(token,JWT_SECRET );
    return true; 
  } catch(error){
    console.log('Token is expired or invalid');
    return false;
  }
};
module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  login,
  logout,
  isLoggedIn
};
