const Article = require("../models/Article");
const Comment = require("../models/Comment");
const Topic = require("../models/Topic");
const User = require("../models/User");
const { validateInput } = require("../util/validateInput");
const { createTopic, associateTopicsWithArticle } = require("./topicsServices");

async function getAllArticles() {
  return Article.find().lean();
}

async function getArticleById(id) {
  const article = await Article.findById(id)
    .populate("author")
    .populate("usersLiked")
    .populate("topics")
    .populate("comments");
  return article;
}
async function getArticleByIdSimple(id) {
  const article = await Article.findById(id).lean();
  return article;
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
async function getAllUniqueArticles(userId) {
  const topicArticleMap = await getArticlesByTopics(userId);
  const allArticles = Object.values(topicArticleMap)
    .reduce((accumulator, articleArray) => {
      return accumulator.concat(articleArray);
    }, [])
    .filter((article, index, self) => {
      return self.findIndex((a) => a._id.equals(article._id)) === index;
    });

  return allArticles;
}

async function getArticlesByTopic(topicId) {
  const topicDocument = await Topic.findById(topicId).populate("articles");
  return topicDocument.articles;
}

async function createArticle(body, userId) {
  await validateInput(body, "createArticle");
  const existingTopics = await Topic.find();
  const topicsToCreate = [];
  const createdTopics = [];
  const author = await User.findById(userId);

  for (const topicName of body.topics) {
    const existingTopic = existingTopics.find(
      (topic) => topic.name === topicName
    );
    if (!existingTopic) {
      topicsToCreate.push(topicName);
    } else {
      createdTopics.push(existingTopic);
    }
  }

  for (const topicName of topicsToCreate) {
    const newTopic = await createTopic({ name: topicName });
    createdTopics.push(newTopic);
  }

  const existingTopicsWithMatchingNames = existingTopics.filter((topic) =>
    body.topics.includes(topic.name)
  );

  const allTopicIds = [
    ...createdTopics.map((topic) => topic._id),
    ...existingTopicsWithMatchingNames.map((topic) => topic._id),
  ];

  // Create a new array with unique topic IDs
  const uniqueTopicIds = Array.from(new Set(allTopicIds));

  const newArticle = new Article({
    title: body.title,
    description: body.description,
    content: body.content,
    authorName: author.name,
    author: userId,
    topics: uniqueTopicIds,
  });

  await newArticle.save();
  await User.findByIdAndUpdate(userId, {
    $push: { articlesCreated: newArticle._id },
  });
  await associateTopicsWithArticle(newArticle, uniqueTopicIds);
  return newArticle;
}
async function editArticle(id, body) {
  await validateInput(body, "editArticle");
  const article = await Article.findById(id);
  article.name = body.name;
  article.description = body.description;
  article.topics = body.topics;
  article.lastEdit = Date.now();
  return await article.save();
}

async function likeArticle(articleId, userId) {
  await Article.findByIdAndUpdate(articleId, { $push: { usersLiked: userId } });
  await User.findByIdAndUpdate(userId, { $push: { articlesLiked: articleId } });
}

async function commentArticle(articleId, commentBody, commentAuthorId) {
  const newComment = new Comment(commentBody);
  newComment.author = commentAuthorId;
  await newComment.save();

  const article = await Article.findById(articleId);
  article.comments.push(newComment._id);
  await article.save();
}
async function deleteArticle(articleId, userId) {
  try {
    const article = await Article.findById(articleId).populate("author");
    const user = await User.findById(userId);
    if (!article) {
      throw new Error("Article not found");
    }
    if (!user) {
      throw new Error("User not found");
    }
    if (article.author._id.toString() !== user._id.toString()) {
      throw new Error("User is not authorized to delete this article");
    }
    await Article.deleteOne({ _id: articleId });
    return true; // Or you can return a success message or status code
  } catch (error) {
    throw error;
  }
}

async function getArticlesByTopics(topicsArr) {
  const articlesByTopics = {};
  for (const topicId of topicsArr) {
    const topic = await Topic.findById(topicId);
    articlesByTopics[topic.name] = [];
    if (topic.articles.length > 0) {
      topic.articles.forEach((article) => {
        articlesByTopics[topic.name].push(article);
      });
    } else {
      articlesByTopics[topic.name].push("");
    }
  }
  return articlesByTopics;
}

module.exports = {
  getAllArticles,
  getArticlesByDate,
  getArticlesByAuthor,
  getArticlesByTopics,
  getAllUniqueArticles,
  createArticle,
  editArticle,
  likeArticle,
  deleteArticle,
  getArticleById,
  getArticlesByTopic,
  commentArticle,
  getArticleByIdSimple,
};
