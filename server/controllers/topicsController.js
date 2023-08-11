const {
  createTopic,
  getAllTopics,
  getSingleTopic,
} = require("../services/topicsServices");
const topicsController = require("express").Router();

topicsController.get("/", async (req, res) => {
  try {
    const topics = await getAllTopics();
    res.status(200).json(topics);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

topicsController.post("/", async (req, res) => {
  try {
    const newTopic = await createTopic(req.params.id);
    console.log(newTopic);
  } catch (err) {
    console.log(err);
  }
});

topicsController.get("/:id", async (req, res) => {
  const topic = await getSingleTopic(req.params.id);
  console.log(topic);
});
module.exports = topicsController;
