const {
  getAllArticles,
  createArticle,
  likeArticle,
} = require("../services/articlesServices");

const articlesController = require("express").Router();

articlesController.get("/", async (req, res) => {
  try {
    const articles = await getAllArticles();
    return articles;
  } catch (error) {
    console.log(error);
  }
});

articlesController.post("/create", async (req, res) => {
  try {
    const newArticle = await createArticle(req.body);
    return newArticle;
  } catch (err) {
    console.log(err);
  }
});

articlesController.post("/:id/edit", async (req, res) => {
  try {
    await editArticle(req.params.id, req.body);
  } catch (err) {
    console.log(err);
  }
});

articlesController.post("/:id/like", async (req, res) => {
  try {
    await likeArticle(req.params.id, req.body);
  } catch (err) {
    console.log(err);
  }
});

articlesController.post("/:id/delete", async (req, res) => {
  try {
    await deleteArticle(req.params.id, req.body);
  } catch (err) {
    console.log(err);
  }
});

module.exports = articlesController;
