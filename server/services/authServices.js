const User = require("../models/User");
const validateInput = require("../util/validateInput");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/env");

async function registerUser(body) {
  await validateInput(body, "registerUser");
  const user = await User.create(body);
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

module.exports = { registerUser, loginUser };
