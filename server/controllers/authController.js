const { registerUser, loginUser } = require("../services/authServices");
const authController = require("express").Router();

// register user
authController.post("/register", async (req, res) => {
  try {
    const formData = req.body;
    const jwt = await registerUser(formData);
    return res.status(201).json({ jwt });
  } catch (err) {
    console.log(
      "🚀 ~ file: authController.js:23 ~ authController.post ~ post:"
    );
    console.log("error is: ", err);
    if (err == "Error: A user with this email or username already exists.") {
      return res
        .status(409)
        .json({ error: "A user with this email or username already exists." });
    } else {
      return res
        .status(500)
        .json({ error: "An error occurred. Please try again later." });
    }
  }
});

// login user
authController.post("/login", async (req, res) => {
  try {
    const formData = req.body;
    const jwt = await loginUser(formData);
    return res.status(200).json({ jwt });
  } catch (err) {
    console.log(
      "🚀 ~ file: authController.js:42 ~ authController.post ~ authController:"
    );
    console.log("error is: ", err);
    if (err == "Error: Email or password do not match.") {
      return res.status(401).json({ error: "Invalid credentials" });
    } else {
      return res
        .status(500)
        .json({ error: "An error occurred. Please try again later." });
    }
  }
});

module.exports = authController;
