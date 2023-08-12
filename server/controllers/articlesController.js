const {
  getAllArticles,
  createArticle,
  likeArticle,
  getArticleById,
  editArticle,
  deleteArticle,
  commentArticle,
} = require("../services/articlesServices");
const { getUserIdFromToken } = require("../util/validateToken");
const articlesController = require("express").Router();

// get all articles
articlesController.get("/", async (req, res) => {
  try {
    const articles = await getAllArticles();
    res.status(200).json(articles);
  } catch (err) {
    console.log(err);
    // not a good practice to expose server errors to the client;
    res.status(500).json({ error: "Internal server error" });
  }
});

// get article by id
articlesController.get("/:id", async (req, res) => {
  try {
    const article = await getArticleById(req.params.id);
    if (!article) {
      res.status(404).json({ error: "Article not found" });
    } else {
      res.status(200).json(article);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

articlesController.post("/:id/comments", async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req.headers.authorization);
    const articleId = req.params.id;
    const commentBody = req.body;
    const article = await commentArticle(articleId, commentBody, userId);
    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// create article
articlesController.post("/create", async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req.headers.authorization);
    const newArticle = await createArticle(req.body, userId);
    if (newArticle) {
      res.status(201).json(newArticle);
    } else {
      res.status(400).json({ error: "Bad Request" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" }); // Status code 500 for server error
  }
});

// edit an article
articlesController.post(":id/edit", async (req, res) => {
  try {
    await editArticle(req.params.id, req.body);
    res.status(200).json({ message: "Article edited successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// like an article
articlesController.post(":id/like", async (req, res) => {
  try {
    await likeArticle(req.params.id, req.body);
    res.status(200).json({ message: "Article liked successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete an article
articlesController.post(":id/delete", async (req, res) => {
  try {
    //TD: check if user is owner;
    await deleteArticle(req.params.id);
    res.status(204).send({ message: "Article deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = articlesController;
