const { Schema, model, Types } = require("mongoose");

const commentSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastEdit: { type: Date, default: Date.now },
  author: { type: Types.ObjectId, ref: "User" },
  article: { type: Types.ObjectId, ref: "Article" },
  usersLiked: { type: [Types.ObjectId], ref: "User", default: [] },
});

const Comment = model("Comment", commentSchema);
module.exports = Comment;
