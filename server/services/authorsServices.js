const User = require("../models/User");

async function getAllAuthors() {
  return User.find().lean();
}

async function getSingleAuthor(id) {
  return User.findById(id).lean();
}

module.exports = {
  getAllAuthors,
  getSingleAuthor,
};
