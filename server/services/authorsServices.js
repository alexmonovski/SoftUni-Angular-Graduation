const User = require("../models/User");

async function getAllAuthors() {
  return User.find().lean();
}

async function getSingleAuthor(id) {
  return User.findById(id).lean();
}

async function subscribeToAuthor(id, subscriberId) {
  await User.findByIdAndUpdate(id, { $push: { subscriptions: subscriberId } });
  await User.findByIdAndUpdate(subscriberId, { $push: { subscribedTo: id } });
}

async function editAuthor(id) {
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
  getAllAuthors,
  getSingleAuthor,
  subscribeToAuthor,
  editAuthor,
};
