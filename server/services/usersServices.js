const User = require("../models/User");

async function getAllUsers() {
  return User.find().lean();
}

async function getUserById(id) {
  return await User.findById(id).populate("topics").lean();
}

async function getUserByIdSimple(id) {
  return await User.findById(id).lean();
}

async function subscribeToUser(id, subscriberId) {
  const subscribee = await User.findById(id);
  const subscriber = await User.findById(subscriberId);

  if (subscribee == false || subscriber == false) {
    throw new Error("Invalid user IDs provided.");
  }

  if (subscribee._id.equals(subscriber._id)) {
    throw new Error("Users cannot subscribe to themselves.");
  }

  if (subscribee.subscriptions.includes(subscriber._id)) {
    throw new Error("User is already subscribed to this subscribee.");
  }

  const updatedSubscribee = await User.findByIdAndUpdate(
    id,
    { $push: { subscriptions: subscriberId } },
    { new: true }
  );
  await updatedSubscribee.save();
  const updatedUser = await User.findByIdAndUpdate(
    subscriberId,
    { $push: { subscribedTo: id } },
    { new: true }
  );
  await updatedUser.save();
  return updatedUser;
}

module.exports = {
  getAllUsers,
  getUserById,
  subscribeToUser,
  getUserByIdSimple,
};
