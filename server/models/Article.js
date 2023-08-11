const { Schema, model, Types } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const articleSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastEdit: { type: Date, default: Date.now },
  author: { type: Types.ObjectId, ref: "User" },
  usersLiked: { type: [Types.ObjectId], ref: "User", default: [] },
  topics: { type: [Types.ObjectId], ref: "Topic", default: [] },
});

articleSchema.plugin(uniqueValidator);
const Article = model("Article", articleSchema);
module.exports = Article;
