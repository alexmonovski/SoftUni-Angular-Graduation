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
