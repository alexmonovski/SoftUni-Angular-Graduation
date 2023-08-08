const Topic = require("../models/Topic");
const { validateInput } = require("../util/validateInput");

async function getAllTopics() {
  return Topic.find().lean();
}

async function getSingleTopic(id) {
  return Topic.findById(id).lean();
}

async function createTopic(body) {
  await validateInput(body, "createArticle");
  const newTopic = await Topic.create(body);
  return newTopic;
}

module.exports = {
  getSingleTopic,
  getAllTopics,
  createTopic,
};
