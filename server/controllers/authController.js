const { registerUser } = require("../services/authServices");
const authController = require("express").Router();

authController.post("/register", async (req, res) => {
  try {
    const token = await registerUser(req.body);
    return res.status(201).json(token);
  } catch (err) {
    console.log(err);
  }
});
authController.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body);
    return res.status(200).json(token);
  } catch (err) {
    console.log(err);
  }
});

module.exports = authController;
