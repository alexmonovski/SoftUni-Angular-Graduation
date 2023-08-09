const {
  getAllUsers,
  getSingleUser,
  subscribeToUser,
} = require("../services/usersServices");
const usersController = require("express").Router();

usersController.get("/", async (req, res) => {
  try {
    const allAuthors = await getAllUsers();
    console.log(allAuthors);
  } catch (err) {
    console.log(err);
  }
});

// get single author for about page; като вземеш single author то всичко влиза в него. ще видя дали ще пиша Populate. после на фронтенда ще обходя масива с топици и статии и ще ги фечна едно по едно
usersController.get("/:id", async (req, res) => {
  try {
    const author = await getSingleUser(req.params.id);
    console.log(author);
  } catch (err) {
    console.log(err);
  }
});

usersController.post("/:id/subscribe", async (req, res) => {
  try {
    //todo: extract token with userId from request
    const userId = "";
    const author = await subscribeToUser(req.params.id, userId);
    console.log(author);
  } catch (err) {
    console.log(err);
  }
});

module.exports = usersController;
