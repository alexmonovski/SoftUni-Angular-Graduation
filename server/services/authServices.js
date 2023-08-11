const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/env");
const { validateInput } = require("../util/validateInput");
const User = require("../models/User");
const Topic = require("../models/Topic");

// check for same titles on the frontend;

async function registerUser(body) {
  const { username, email, topics } = body;
  const password = body.passwordGroup.password;

  const parsedBody = {
    username,
    email,
    password,
  };
  // на този етап не са наложителни топиците
  await validateInput(parsedBody, "registerUser");

  const user = await User.create(parsedBody);
  const topicsToAdd = [];

  // for (const topicData of topics) {
  //   const topic = await Topic.findOne({ title: topicData.title });
  //   if (!topic) {
  //     console.log(topicData);
  //     topic = await Topic.create({ title: topicData.title });
  //   }
  //   topicsToAdd.push(topic._id);
  // }

  // await User.findByIdAndUpdate(
  //   user._id,
  //   { $push: { topics: { $each: topicsToAdd } } },

  //   This option indicates that you want the updated document to be returned as the result of the update operation. By default, Mongoose returns the document as it was before the update. Setting new to true ensures that you get the updated document with the new topics array.
  //   { new: true }
  // );

  return createSession(user);
}

async function loginUser(body) {
  const user = await validateInput(body, "loginUser");
  return createSession(user);
}

function createSession(user) {
  const payload = {
    userId: user._id.toString(),
    userEmail: user.email,
    username: user.username,
  };
  const token = jwt.sign(payload, SECRET);
  return token;
}

module.exports = {
  registerUser,
  loginUser,
};
