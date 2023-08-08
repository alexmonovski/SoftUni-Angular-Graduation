const { Schema, model, Types } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const articleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  usersLiked: { type: [Types.ObjectId], ref: "User", default: [] },
  author: { type: Types.ObjectId, ref: "User" },
  topics: { type: [Types.ObjectId], ref: "Topic", default: [] },
  createdAt: { type: Date, default: Date.now },
  lastEdit: { type: Date, default: Date.now },
});

articleSchema.plugin(uniqueValidator);
const Article = model("Article", articleSchema);
module.exports = Article;
