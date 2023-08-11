const { registerUser, loginUser } = require("../services/authServices");
const authController = require("express").Router();

// register user
authController.post("/register", async (req, res) => {
  try {
    // possibly add a special res.status if username is already taken
    const formData = req.body;
    const token = await registerUser(formData);
    return res
      .status(201)
      .json({ message: "Registration successful", jwt: token });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
});

// login user
authController.post("/login", async (req, res) => {
  try {
    const formData = req.body;
    const token = await loginUser(formData);
    return res.status(200).json({ message: "Login successful", jwt: token });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
});

module.exports = authController;
