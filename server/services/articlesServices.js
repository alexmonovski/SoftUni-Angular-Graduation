const Article = require("../models/Article");
const Comment = require("../models/Comment");
const Topic = require("../models/Topic");
const User = require("../models/User");
const { validateInput } = require("../util/validateInput");

async function getAllArticles() {
  return Article.find().lean();
}

async function getArticleById(id) {
  return await Article.findById(id)
    .populate("author")
    .populate("usersLiked")
    .populate("topics")
    .populate("comments");
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

async function getArticlesByTopic(topicId) {
  const topicDocument = await Topic.findById(topicId).populate("articles");
  return topicDocument.articles;
}

async function getArticlesByTopics(topicArray) {
  const articlesByTopics = {};
  for (const topic of topicArray) {
    articlesByTopics[topic] = await getArticlesByTopic(topic);
  }
  return articlesByTopics;
}

async function createArticle(body, userId) {
  await validateInput(body, "createArticle");

  console.log(body.title, body.description, body.content, userId);

  const newArticle = new Article({
    title: body.title,
    description: body.description,
    content: body.content,
    author: userId,
  });
  await newArticle.save();
  await User.findByIdAndUpdate(userId, {
    $push: { articlesCreated: newArticle._id },
  });
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

async function commentArticle(articleId, commentBody, authorId) {
  const newComment = new Comment(commentBody);
  newComment.author = authorId;
  await newComment.save();

  const article = await Article.findById(articleId);
  article.comments.push(newComment._id);
  await article.save();
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
  getArticleById,
  getArticlesByTopic,
  commentArticle,
};
