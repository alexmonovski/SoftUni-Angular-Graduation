const Article = require("../models/Article");
const Topic = require("../models/Topic");
const User = require("../models/User");
const { validateInput } = require("../util/validateInput");

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

// същия сървис е това, просто ще го викаме 10 пъти.
async function getArticlesByAuthor(authorId) {
  return Article.find({ author: authorId });
}

async function getArticlesByTopics(topicArray) {
  const articlesByTopics = {};
  for (const topic of topicArray) {
    const topicDocument = await Topic.findOne({ name: topic }).populate(
      "articles"
    );
    articlesByTopics[topic] = topicDocument.articles;
  }
  return articlesByTopics;
}

async function createArticle(body) {
  await validateInput(body, "createArticle");
  const newArticle = await Article.create(body);
  return newArticle;
}

async function editArticle(id, body) {
  await validateInput(body, "editArticle");
  const article = await Article.findById(id);
  article.name = body.name;
  article.description = body.description;
  article.topics = body.topics;
  article.lastEdit = Date.now();
  await article.save();
}

async function likeArticle(id, subscriberId) {
  await Article.findByIdAndUpdate(id, { $push: { usersLiked: subscriberId } });
  await User.findByIdAndUpdate(subscriberId, { $push: { subscribedTo: id } });
}

async function deleteArticle(id) {
  await Article.findByIdAndDelete(id);
}

module.exports = {
  getAllArticles,
  getArticlesByDate,
  getArticlesByAuthor,
  getArticlesByTopics,
  createArticle,
  editArticle,
  likeArticle,
  deleteArticle,
};
