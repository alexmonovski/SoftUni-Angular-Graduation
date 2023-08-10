const { registerUser, loginUser } = require("../services/authServices");
const { getSingleUser } = require("../services/usersServices");

const authController = require("express").Router();

authController.post("/register", async (req, res) => {
  try {
    const token = await registerUser(req.body);
    return res.status(201).json(token);
  } catch (err) {
    console.log(err);
  }
});

// expocts email and password in the body
authController.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.data);
    return res.status(200).json(token);
  } catch (err) {
    console.log(err);
  }
});

authController.get("/:id", async (req, res) => {
  try {
    const user = await getSingleUser(req.params.id);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

authController.post("/:id/edit", async (req, res) => {
  try {
    const author = await editUser(req.params.id, userId);
    console.log(author);
  } catch (err) {
    console.log(err);
  }
});

module.exports = authController;
