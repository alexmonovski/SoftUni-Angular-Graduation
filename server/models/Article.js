const { Schema, model, Types } = require("mongoose");

const articleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
});

const Article = model("Article", articleSchema);
module.exports = Article;
