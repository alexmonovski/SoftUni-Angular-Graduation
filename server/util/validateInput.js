const User = require("../models/User");
const bcrypt = require("bcrypt");
const { URL_PATTERN } = require("../config/env");

async function validateInput(body, command) {
  if (command == "createAsset") {
    // let [title, charity, price, description, category, imageUrl] =
    //   Object.values(body);
    // if (
    //   title == "" ||
    //   charity == "" ||
    //   price == "" ||
    //   description == "" ||
    //   category == "" ||
    //   imageUrl == ""
    // ) {
    //   throw new Error("All fields are required.");
    // }
    // price = Number(price);

    // if (title.length < 10) {
    //   throw new Error("Title should be at least 10 characters long.");
    // }
    // if (charity.length < 2) {
    //   throw new Error("Charity should be at least 2 characters long.");
    // }
    // if (price < 0) {
    //   throw new Error("Price should be a positive number.");
    // }
    // if (description.length < 10 || description.length > 100) {
    //   throw new Error(
    //     "Description should be between 10 and 100 characters long."
    //   );
    // }
    // if (category.length < 5) {
    //   throw new Error("Category should be minimum 5 characters long.");
    // }
    // if (!URL_PATTERN.test(imageUrl)) {
    //   throw new Error("Image Url should be a valid link.");
    // }
    return true;
  } else if (command == "editAsset") {
    let [title, charity, price, description, category] = Object.values(body);
    if (
      title == "" ||
      charity == "" ||
      price == "" ||
      description == "" ||
      category == ""
    ) {
      throw new Error("All fields are required.");
    }
    price = Number(price);

    if (title.length < 10) {
      throw new Error("Title should be at least 10 characters long.");
    }
    if (charity.length < 2) {
      throw new Error("Charity should be at least 2 characters long.");
    }
    if (price < 0) {
      throw new Error("Price should be a positive number.");
    }
    if (description.length < 10 || description.length > 100) {
      throw new Error(
        "Description should be between 10 and 100 characters long."
      );
    }
    if (category.length < 5) {
      throw new Error("Category should be minimum 5 characters long.");
    }
  }
  //
  else if (command == "registerUser") {
    const { email, username, password, repass } = body;
    if (email == "" || username == "" || password == "" || repass == "") {
      throw new Error("All fields are required.");
    }
    const emailTaken = await User.findOne({ email: email });
    const usernameTaken = await User.findOne({ username: username });
    if (emailTaken || usernameTaken) {
      throw new Error("A user with this email or username already exists.");
    }
    if (password != repass) {
      throw new Error("Password fields do not match.");
    }
    // if (username.length < 4) { throw new Error('Username should be at least 4 characters long.') }
    // if (email.length < 10) { throw new Error('Email should be at least 10 characters long.') }
    // if (password.length < 4) { throw new Error('Password should be at least 4 characters long.') }
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
}

module.exports = validateInput;
