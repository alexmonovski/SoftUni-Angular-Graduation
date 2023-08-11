const {
  getAllArticles,
  createArticle,
  likeArticle,
  getArticlesByAuthor,
  getArticlesByTopics,
  getArticleById,
  editArticle,
} = require("../services/articlesServices");

const articlesController = require("express").Router();

articlesController.get("/", async (req, res) => {
  try {
    const articles = await getAllArticles();
    console.log("return value", articles);
    res.json(articles);
  } catch (error) {
    console.log(error);
  }
});

articlesController.get("/:id", async (req, res) => {
  try {
    const article = await getArticleById(req.params.id);
    return article.json();
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

articlesController.post("/topic", async (req, res) => {
  try {
    const data = req.body.data;
    const articles = await getArticlesByTopics(data);
    return articles;
  } catch (error) {
    console.log(error);
  }
});
articlesController.post("/subscription", async (req, res) => {
  try {
    // arr of objects
    const { data } = req.body.data;
    const articles = {};

    for (const tokens of data) {
      const { name, id } = tokens;
      articles[name] = await getArticlesByAuthor(id);
    }

    return articles;
  } catch (error) {
    console.log(error);
  }
});

articlesController.post("/edit/:id", async (req, res) => {
  try {
    await editArticle(req.params.id, req.body);
  } catch (err) {
    console.log(err);
  }
});

articlesController.post("/like/:id", async (req, res) => {
  try {
    await likeArticle(req.params.id, req.body);
  } catch (err) {
    console.log(err);
  }
});

articlesController.post("/delete/:id", async (req, res) => {
  try {
    await deleteArticle(req.params.id, req.body);
  } catch (err) {
    console.log(err);
  }
});

module.exports = articlesController;
