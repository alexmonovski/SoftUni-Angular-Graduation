const { registerUser, loginUser } = require("../services/authServices");
const { getSingleUser } = require("../services/usersServices");

const authController = require("express").Router();

authController.post("/register", async (req, res) => {
  try {
    const formData = req.body;
    const token = await registerUser(formData);
    return res.status(201).json({ jwt: token });
  } catch (err) {
    console.log(err);
  }
});

// expects email and password in the body
authController.post("/login", async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    const token = await loginUser(formData);
    return res.status(200).json({ jwt: token });
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
