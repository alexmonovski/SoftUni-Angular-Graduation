const User = require("../models/User");

async function getAllUsers() {
  return User.find().lean();
}

async function getUserById(id) {
  return await User.findById(id).lean();
}

async function subscribeToUser(id, subscriberId) {
  await User.findByIdAndUpdate(id, { $push: { subscriptions: subscriberId } });
  await User.findByIdAndUpdate(subscriberId, { $push: { subscribedTo: id } });
  return true;
}

module.exports = {
  getAllUsers,
  getUserById,
  subscribeToUser,
};
