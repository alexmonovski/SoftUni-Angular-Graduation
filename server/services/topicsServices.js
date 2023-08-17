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
  const newTopic = await Topic.create(body);
  return newTopic;
}

async function associateTopicsWithArticle(articleId, topicsIds) {
  for (const topicId of topicsIds) {
    const topic = await Topic.findById(topicId);
    topic.articles.push(articleId);
    await topic.save();
  }
  return true;
}

async function deleteEmptyTopics() {
  // Find topics where both 'articles' and 'users' arrays are empty
  const emptyTopics = await Topic.find({
    articles: { $size: 0 },
    users: { $size: 0 },
  });

  // Delete the empty topics
  for (const topic of emptyTopics) {
    await Topic.deleteOne({ _id: topic._id });
  }

  return true;
}

module.exports = {
  getSingleTopic,
  getAllTopics,
  createTopic,
  getTopicsByArticle,
  createTopic,
  associateTopicsWithArticle,
  deleteEmptyTopics,
};
