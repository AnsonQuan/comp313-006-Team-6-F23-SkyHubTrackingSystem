const User = require("../models/user");
// Import dependencies
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "jwt_secret_key"; 
const jwtExpirySeconds = 300;

//Registers a user
const addUser = async (_, { firstName, lastName, email, password, address, phoneNumber, role }) => {
  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error('User already exists with this email');
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      role,
    });

    // Save user to database
    const savedUser = await newUser.save();

    // Optionally, handle the login token here if you want to auto-login users after registration

    return savedUser;
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

const getUsers = async () => {
  const users = await User.find().exec();
  if (!users) {
    throw new Error("Error");
  }
  return users;
};

const getUserById = async (root, params) => {
  const userFound = await User.findById(params.id).exec();
  if (!userFound) {
    throw new Error("Error");
  }
  return userFound;
};

const updateUser = async (root, params) => {
  const updatedUser = await User.findByIdAndUpdate(params.id, params).exec();
  if (!updatedUser) {
    throw new Error("Error");
  }
  return updatedUser;
};

const login = async (root, { email, password }, context) => {
  console.log(`User logging in with email: ${email}`);
  
  const user = await User.findOne({ email }).exec();
  if (!user) {
    console.error('User not found for email: ', email);
    return { success: false, message: 'User not found' }; // Use an appropriate error message
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    console.error('Invalid password for email: ', email);
    return { success: false, message: 'Invalid password' }; // Use an appropriate error message
  }

  const token = jwt.sign({ _id: user._id, email: user.email }, JWT_SECRET, { expiresIn: jwtExpirySeconds });
  console.log('Generated token: ', token);

  context.res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true });

  return { success: true, firstName: user.firstName };
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
