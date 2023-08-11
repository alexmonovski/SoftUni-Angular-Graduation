const Article = require("../models/Article");
const Topic = require("../models/Topic");
const { validateInput } = require("../util/validateInput");

async function getAllTopics() {
  return Topic.find().lean();
}

async function getSingleTopic(id) {
  return Topic.findById(id).lean();
}

async function getTopicsByArticle(articleId) {
  const articleDocument = await Article.findById(articleId).populate("topics");
  return articleDocument.topics;
}

async function createTopic(body) {
  await validateInput(body, "createArticle");
  console.log(body);
  const newTopic = await Topic.create(body);
  return newTopic;
}

module.exports = {
  getSingleTopic,
  getAllTopics,
  createTopic,
  getTopicsByArticle,
};
