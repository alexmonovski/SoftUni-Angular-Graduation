const {
  getAllAuthors,
  subscribeToAuthor,
  editAuthor,
} = require("../services/authorsServices");
const authorsController = require("express").Router();

authorsController.get("/", async (req, res) => {
  try {
    const allAuthors = await getAllAuthors();
    console.log(allAuthors);
  } catch (err) {
    console.log(err);
  }
});

// get single author for about page; като вземеш single author то всичко влиза в него. ще видя дали ще пиша Populate. после на фронтенда ще обходя масива с топици и статии и ще ги фечна едно по едно
authorsController.get("/:id", async (req, res) => {
  try {
    const author = await getSingleAuthor(req.params.id);
    console.log(author);
  } catch (err) {
    console.log(err);
  }
});

authorsController.post("/:id/subscribe", async (req, res) => {
  try {
    //todo: extract token with userId from request
    const userId = "";
    const author = await subscribeToAuthor(req.params.id, userId);
    console.log(author);
  } catch (err) {
    console.log(err);
  }
});

authorsController.post("/:id/edit", async (req, res) => {
  try {
    const author = await editAuthor(req.params.id, userId);
    console.log(author);
  } catch (err) {
    console.log(err);
  }
});

module.exports = authorsController;
