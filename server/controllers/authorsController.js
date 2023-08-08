const { getAllAuthors } = require("../services/authorsServices");

const authorsController = require("express").Router();

authorsController.get("/", async (req, res) => {
  const allAuthors = await getAllAuthors();
  console.log(allAuthors);
});

// get single author for about page; като вземеш single author то всичко влиза в него. ще видя дали ще пиша Populate. после на фронтенда ще обходя масива с топици и статии и ще ги фечна едно по едно
authorsController.get("/:id", async (req, res) => {
  const author = await getSingleAuthor(req.params.id);
  console.log(author);
});

module.exports = authorsController;
