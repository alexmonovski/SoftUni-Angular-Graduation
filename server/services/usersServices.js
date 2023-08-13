const User = require("../models/User");

async function getAllUsers() {
  return User.find().lean();
}

async function getUserById(id) {
  return await User.findById(id)
    .populate("topics")
    .populate("articlesCreated")
    .populate("articlesLiked")
    .populate("subscribedTo")
    .populate("subscriptions")
    .lean();
}

async function getUserByIdSimple(id) {
  return await User.findById(id).lean();
}

async function subscribeToUser(id, subscriberId) {
  const updatedSubscribee = await User.findByIdAndUpdate(
    id,
    { $push: { subscriptions: subscriberId } },
    { new: true }
  );
  const updatedUser = await User.findByIdAndUpdate(
    subscriberId,
    { $push: { subscribedTo: id } },
    { new: true } // Make sure to use the new option
  );
  return updatedUser;
}

module.exports = {
  getAllUsers,
  getUserById,
  subscribeToUser,
  getUserByIdSimple,
};
