const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/env");
const { validateInput } = require("../util/validateInput");
const User = require("../models/User");

async function registerUser(body) {
  // await validateInput(body, "registerUser");
  const password = body.passwordGroup.password;
  const { username, email } = body;
  const parsedBody = {
    email,
    username,
    password,
  };
  const user = await User.create(parsedBody);
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
