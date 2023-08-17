const Article = require("../models/Article");
const Topic = require("../models/Topic");
const User = require("../models/User");
const bcrypt = require("bcrypt");

async function validateInput(body, command) {
  if (command == "createArticle" || command == "editArticle") {
    let { title, description, content } = body;
    if (title == "" || description == "" || content == "") {
      throw new Error("All fields are required.");
    }
    const article = await Article.findOne({ title: title });
    if (article) {
      if (article._id.toString() != body._id) {
        throw new Error("An article with this title already exists.");
      }
    }
    return true;
  }
  //
  else if (command == "registerUser" || command == "editUser") {
    const { _id, name, email, description, password, topics } = body;

    if (email === "" || name === "" || description === "" || password === "") {
      throw new Error("All fields are required.");
    }

    const userWithTakenEmail = await User.findOne({ email: email });
    const userWithTakenName = await User.findOne({ name: name });

    if (userWithTakenEmail && userWithTakenEmail._id.toString() !== _id) {
      throw new Error("A user with this email already exists.");
    }

    if (userWithTakenName && userWithTakenName._id.toString() !== _id) {
      throw new Error("A user with this username already exists.");
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
    const comparePass = bcrypt.compare(body.password, user.password);
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
