const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Use environment variable for JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;
const jwtExpirySeconds = 3600;

//Registers a user
const addUser = async (root, params) => {
  const userModel = new User(params);
  const newUser = await userModel.save();
  if (!newUser) {
    throw new Error("Error");
  }
  return newUser;
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

const login = async (_, { email, password }) => {
  try {
    const user = await User.findOne({ email }).exec();
    if (!user) {
      throw new Error("User not found"); // Make generic again before production
    }

    const ValidPassword = await user.comparePassword(password.trim());

    if (!ValidPassword) {
      throw new Error("Invalid password"); // Make generic again before production
    }

    // Ensure you have JWT_SECRET set in your .env file
    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not set");
      throw new Error("Server configuration error");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: jwtExpirySeconds,
    });
    console.log(`Token for user ${user._id}: ${token}`);
    return { token, firstName: user.firstName };
  } catch (error) {
    console.error("Login error:", error); // Temporary debugging log
    throw new Error("Authentication failed"); // This is the production-safe message
  }
};

// Logout function
const logout = async (_, { res }) => {
  res.clearCookie("token");
  return { message: "Logged out successfully" };
};
module.exports = {
  addUser,
  getUsers,
  getUserById,
  updateUser,
  login,
  logout,
};
