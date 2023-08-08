const {
  createTopic,
  getAllTopics,
  getSingleTopic,
} = require("../services/topicsServices");
const topicsController = require("express").Router();

topicsController.get("/", async (req, res) => {
  const topics = await getAllTopics(req.params.id);
  console.log(topics);
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
