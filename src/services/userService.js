const User = require("../models/User");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  const user = new User({ ...data, password: hashedPassword });
  return user.save();
}

async function getUsers(filter, options) {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;
  const users = await User.find(filter).skip(skip).limit(limit);
  const total = await User.countDocuments(filter);
  return { users, total };
}

async function getUserById(id) {
  return User.findById(id);
}

async function updateUser(id, data) {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return User.findByIdAndUpdate(id, data, {
    new: true,
  });
}

async function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

async function setProfilePic(id, filename) {
  return User.findByIdAndUpdate(id, { profilePic: filename }, { new: true });
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  setProfilePic,
};
