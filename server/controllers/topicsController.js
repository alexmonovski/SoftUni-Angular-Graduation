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
    res.status(200).json({ topics });
  } catch (err) {
    console.log(
      "🚀 ~ file: topicsController.js:11 ~ topicsController.get ~ async:"
    );
    console.error("error is " + err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get topic by id
topicsController.get("/:id", async (req, res) => {
  try {
    const topic = await getSingleTopic(req.params.id);
    res.status(200).json({ topic });
  } catch (err) {
    console.log(
      "🚀 ~ file: topicsController.js:31 ~ topicsController.get ~ topicsController"
    );
    console.error("error is " + err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get articles for a single topic
topicsController.get("/:id/articles", async (req, res) => {
  try {
    const articles = await getArticlesByTopic(req.params.id);
    if (articles.length > 0) {
      res.status(200).json({ articles });
    } else {
      res.status(404).json({ error: "No articles found for the given topic" });
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: topicsController.js:47 ~ topicsController.get ~ articles:"
    );
    console.error("error is " + err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// add topic
topicsController.post("/", async (req, res) => {
  try {
    const newTopic = await createTopic(req.params.id);
    res.status(201).json({ newTopic });
  } catch (err) {
    console.log(
      "🚀 ~ file: topicsController.js:51 ~ topicsController.post ~ async:"
    );
    console.error("error is " + err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = topicsController;
