const {
  getAllUsers,
  subscribeToUser,
  getUserById,
  getUserByIdSimple,
} = require("../services/usersServices");
const { getUserIdFromToken } = require("../util/validateToken");
const usersController = require("express").Router();

// get all users
usersController.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users });
  } catch (err) {
    console.log(
      "🚀 ~ file: usersController.js:20 ~ usersController.get ~ get:",
      
    );
    console.error("Error is: " + err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get single user
usersController.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    if (req.query.action == "lean") {
      const user = await getUserByIdSimple(userId);
      res.status(200).json({ user });
    } else {
      const user = await getUserById(userId);
      res.status(200).json({ user });
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: usersController.js:24 ~ usersController.get ~ async:"
    );
    console.error("Error is: " + err);
    res.status(500).json({ error: "Internal server error" });
  }
});

usersController.get("/current", async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req.headers.authorization);
    const user = await getUserById(userId);
    res.status(200).json({ user });
  } catch (err) {
    console.log(
      "🚀 ~ file: usersController.js:50 ~ usersController.get ~ current:",
      
    );
    console.error("Error is: " + err);
    res.status(500).json({ error: "Internal server error" });
  }
});

usersController.post("/:id/subscribe", async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req.headers.authorization);
    const updatedUser = await subscribeToUser(req.params.id, userId);
    if (updatedUser) {
      return res.status(200).json({ updatedUser });
    } else {
      return res.status(500).json({ error: "Subscription failed" });
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: usersController.js:53 ~ usersController.post ~ async:"
    );
    console.error("Error is: " + err);
    return res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
});

module.exports = usersController;
