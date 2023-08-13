const { getArticlesByTopic } = require("../services/articlesServices");
const {
  createTopic,
  getAllTopics,
  getSingleTopic,
} = require("../services/topicsServices");
const topicsController = require("express").Router();

// get all topics;
topicsController.get("/", async (req, res) => {
  try {
    const topics = await getAllTopics();
    res.status(200).json({ message: "Topics retrieved successfully", topics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get topic by id
topicsController.get("/:id", async (req, res) => {
  try {
    const topic = await getSingleTopic(req.params.id);
    res.status(200).json({ message: "Topic retrieved successfully", topic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get articles for a single topic
topicsController.get("/:id/articles", async (req, res) => {
  try {
    const articles = await getArticlesByTopic(req.params.id);
    if (articles.length > 0) {
      res.status(200).json({
        message: "Articles by topic retrieved successfully",
        articles,
      });
    } else {
      res.status(404).json({ error: "No articles found for the given topic" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// add topic
topicsController.post("/", async (req, res) => {
  try {
    const newTopic = await createTopic(req.params.id);
    res.status(201).json({ message: "Topic created successfully", newTopic });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = topicsController;
