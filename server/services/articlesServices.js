const Article = require("../models/Article");
const Comment = require("../models/Comment");
const Topic = require("../models/Topic");
const User = require("../models/User");
const { validateInput } = require("../util/validateInput");
const {
  createTopic,
  associateTopicsWithArticle,
  deleteEmptyTopics,
} = require("./topicsServices");

async function getAllArticles() {
  return Article.find().lean();
}

async function getArticleById(id) {
  const article = await Article.findById(id).populate("topics");
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
  const author = await User.findById(userId);

  const uniqueTopicIds = await createAndParseTopics(body.topics);

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

async function createAndParseTopics(topics) {
  const existingTopics = await Topic.find();
  const topicsToCreate = [];
  const createdTopics = [];

  for (const topicName of topics) {
    const existingTopic = existingTopics.find(
      (topic) => topic.name === topicName
    );
    if (existingTopic == undefined) {
      console.log(topicName);

      topicsToCreate.push(topicName);
    } else {
      createdTopics.push(existingTopic);
    }
  }

  for (const topicName of topicsToCreate) {
    const newTopic = await createTopic({ name: topicName });
    createdTopics.push(newTopic);
  }

  const existingTopicsWithMatchingNames = existingTopics.filter((topic) => {
    topics.includes(topic.name);
  });

  const allTopicIds = [
    ...createdTopics.map((topic) => topic._id),
    ...existingTopicsWithMatchingNames.map((topic) => topic._id),
  ];

  const uniqueTopicIds = Array.from(new Set(allTopicIds));
  return uniqueTopicIds;
}

async function editArticle(id, body) {
  body._id = id;
  await validateInput(body, "editArticle");
  const article = await Article.findById(id);
  article.title = body.title;
  article.description = body.description;
  article.lastEdit = Date.now();
  const topics = await createAndParseTopics(body.topics);
  article.topics = topics;
  return await article.save();
}

async function likeArticle(articleId, userId) {
  const article = await Article.findById(articleId);
  if (article.usersLiked.includes(userId)) {
    throw new Error("User has already liked this article.");
  }
  const user = await User.findById(userId);
  if (user.articlesLiked.includes(articleId)) {
    throw new Error("User has already liked this article.");
  }

  article.usersLiked.push(userId);
  await article.save();
  user.articlesLiked.push(articleId);
  await user.save();

  return article;
}

async function commentArticle(articleId, commentBody, commentAuthorId) {
  const newComment = new Comment(commentBody);
  newComment.author = commentAuthorId;
  await newComment.save();

  const article = await Article.findById(articleId);
  article.comments.push(newComment._id);
  await article.save();

  const user = await User.findById(commentAuthorId);
  user.commentsCreated.push(newComment._id);
  await user.save();
}

async function deleteArticle(articleId, userId) {
  const article = await Article.findById(articleId)
    .populate("author")
    .populate("topics")
    .populate("comments");
  if (article == false) {
    throw new Error("Article not found");
  }

  if (article.author.equals(userId) == false) {
    throw new Error("User is not authorized to delete this article");
  }

  const author = article.author;

  // Remove the article from the author's articlesCreated array
  author.articlesCreated.pull(articleId);

  // Remove the article from any topics it's associated with
  for (const topic of article.topics) {
    topic.articles.pull(articleId);
    await topic.save();
  }

  // Remove the article from users' articlesLiked array
  await User.updateMany(
    { articlesLiked: articleId },
    { $pull: { articlesLiked: articleId } }
  );

  // Delete the associated comments and update user's comments arrays
  for (const commentId of article.comments) {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (comment) {
      await User.updateMany(
        { $or: [{ commentsCreated: commentId }, { commentsLiked: commentId }] },
        { $pull: { commentsCreated: commentId, commentsLiked: commentId } }
      );
    }
  }

  // Delete the article itself
  await Article.deleteOne({ _id: articleId });

  // Save the modified author
  await author.save();

  // Find and remove empty topics that have no users or articles associated with them
  await deleteEmptyTopics();

  return true;
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

async function getCommentById(commentId) {
  const comment = await Comment.findById(commentId).lean();
  return comment;
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
  getCommentById,
};
