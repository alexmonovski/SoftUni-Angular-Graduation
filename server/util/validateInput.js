const Topic = require("../models/Topic");
const User = require("../models/User");
const bcrypt = require("bcrypt");

async function validateInput(body, command) {
  if (command == "createArticle" || command == "editArticle") {
    let { title, description, content } = body;
    if (title == "" || description == "" || content == "") {
      throw new Error("All fields are required.");
    }
    return true;
  }
  //
  else if (command == "registerUser") {
    const { email, username, password, topics } = body;
    if (email == "" || username == "" || password == "") {
      throw new Error("All fields are required.");
    }
    const emailTaken = await User.findOne({ email: email });
    const usernameTaken = await User.findOne({ username: username });

    console.log(emailTaken, usernameTaken);
    if (emailTaken || usernameTaken) {
      throw new Error("A user with this email or username already exists.");
    }
    return true;
  }
  //
  else if (command == "loginUser") {
    const { email, password } = body;
    if (email == "" || password == "") {
      throw new Error("All fields are required.");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Email or password do not match.");
    }
    const comparePass = await bcrypt.compare(body.password, user.password);
    if (!comparePass) {
      throw new Error("Email or password do not match.");
    }
    return user;
  }
  //
  else if (command == "topic") {
    const { topic } = body;
    if (topic == "") {
      throw new Error("Empty field!");
    }
    const topicTaken = await Topic.findOne({ name: topic });
    if (topicTaken) {
      throw new Error("Topic already exists!");
    }
  }
  //
  else if (command == "editUser") {
    return;
  }
}
module.exports = { validateInput };
