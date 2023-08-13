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
    res.status(200).json({ message: "Users retrieved successfully", users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get single user
usersController.get("/:id", async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req.headers.authorization);
    if (req.query.action == "simple") {
      const user = await getUserByIdSimple(userId);
      res.status(200).json({ message: "User retrieved successfully", user });
    } else {
      const user = await getUserById(userId);
      res.status(200).json({ message: "User retrieved successfully", user });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
usersController.get("/current", async (req, res) => {
  try {
    // то хубаво, само че трябва да го вземеш от токена, защото сега това е адреса на статията, не на юзъра
    const userId = await getUserIdFromToken(req.headers.authorization);
    const user = await getUserById(userId);
    res.status(200).json({ message: "User retrieved successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

usersController.post("/:id/subscribe", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req.headers.authorization);
    const subscription = await subscribeToUser(req.params.id, userId);
    if (subscription) {
      return res
        .status(200)
        .json({ message: "Subscribed successfully", updatedUser: subs });
    } else {
      return res.status(500).json({ error: "Subscription failed" });
    }
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "An error occurred. Please try again later." });
  }
});

module.exports = usersController;
