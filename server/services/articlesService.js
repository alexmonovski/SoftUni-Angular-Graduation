const Article = require("../models/Article");
const Topic = require("../models/Topic");

async function getAllArticles() {
  return Article.find().lean();
}

async function getArticlesByDate(startDate, endDate) {
  return Article.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  }).lean();
}

async function getArticlesByAuthor(authorId) {
  return Article.find({ author: authorId });
}

async function getArticlesByTopics(topicArray) {
  const articlesByTopics = {};
  for (const topic of topicArray) {
    const topicDocument = await Topic.findOne({ name: topic }).populate(
      "articles"
    );
    articlesByTopics.topic = topicDocument.articles;
  }
  return articlesByTopics;
}

async function createArticle(body) {
  await validateInput(body, "createAsset");
  const newArticle = await Article.create(body);
  return newArticle;
}

module.exports = {
  getAllArticles,
  getArticlesByDate,
  getArticlesByAuthor,
  getArticlesByTopics,
  createArticle,
};
