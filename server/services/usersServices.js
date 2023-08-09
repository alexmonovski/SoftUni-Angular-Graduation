const User = require("../models/User");
const validateInput = require("../util/validateInput");

async function getAllUsers() {
  return User.find().lean();
}

async function getSingleUser(id) {
  return User.findById(id).lean();
}

async function subscribeToUser(id, subscriberId) {
  await User.findByIdAndUpdate(id, { $push: { subscriptions: subscriberId } });
  await User.findByIdAndUpdate(subscriberId, { $push: { subscribedTo: id } });
}

async function editUser(id) {
  await validateInput(body, "editUser");
  const user = await User.findById(id);
  user.name = body.name;
  user.email = body.email;
  user.password = body.password;
  user.description = body.description;
  user.topics = body.topics;
  user.articlesLiked = body.articlesLiked;
  user.subscribedTo = body.subscribedTo;
  await user.save();
}

module.exports = {
  getAllUsers,
  getSingleUser,
  subscribeToUser,
  editUser,
};
