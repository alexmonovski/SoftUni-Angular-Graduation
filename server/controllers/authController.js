const authController = require("express").Router();

authController.post("/auth/register", async (req, res) => {
  try {
    const token = await registerUser(req.body);
    return res.status(201).json(token);
  } catch (err) {
    console.log(err);
  }
});
authController.post("/auth/login", async (req, res) => {
  try {
    const token = await loginUser(req.body);
    return res.status(200).json(token);
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
