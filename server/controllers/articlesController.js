const {
  getAllArticles,
  createArticle,
} = require("../services/articlesService");

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

module.exports = articlesController;
