const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/env");
const { validateInput } = require("../util/validateInput");
const User = require("../models/User");
const Topic = require("../models/Topic");
const bcrypt = require("bcrypt");

// check for same titles on the frontend;

async function registerUser(body) {
  const { name, email, description, topics, password } = body;
  await validateInput(body, "registerUser");
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    description,
    password: hashedPassword,
  });
  const createdUser = await newUser.save();
  // query to find documents in the "Topic" collection where the "name" field matches any value in the topics array. The $in operator is used to match any documents where the "name" field is one of the values in the provided array.
  const existingTopics = await Topic.find({ name: { $in: topics } }).exec();
  // get the id-s of all of the existing topics;
  const existingTopicIds = existingTopics.map((topic) => topic._id);

  // loop through the topics arr of topic names (strings); the line of code filters the topics array to include only those topic names for which there is no corresponding topic in the existingTopics array. In other words, it creates an array of topic names that are not already present in the database, which will later be used to create new topics.
  const topicsToCreate = topics.filter(
    (topicName) =>
      !existingTopics.some((existingTopic) => existingTopic.name === topicName)
  );
  const newTopics = await Topic.insertMany(
    topicsToCreate.map((topicName) => ({ name: topicName }))
  );
  const createdTopicIds = newTopics.map((topic) => topic._id);
  const updatedUser = await User.findByIdAndUpdate(
    createdUser._id,
    { $push: { topics: { $each: [...existingTopicIds, ...createdTopicIds] } } },
    { new: true }
  ).exec();
  return createSession(updatedUser);
}

async function loginUser(body) {
  const user = await validateInput(body, "loginUser");
  return createSession(user);
}

function createSession(user) {
  const userId = user._id.toString();
  const token = jwt.sign(userId, SECRET);

  const session = {
    userId,
    token,
  };
  return session;
}

module.exports = {
  registerUser,
  loginUser,
};
