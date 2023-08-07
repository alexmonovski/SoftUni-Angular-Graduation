const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  description: { type: String, required: true },
  topics: { type: [Types.ObjectId], ref: "Topic", default: [] },
  articlesCreated: { type: [Types.ObjectId], ref: "Article", default: [] },
  articlesLiked: { type: [Types.ObjectId], ref: "Article", default: [] },
  subscriptions: { type: [Types.ObjectId], ref: "User", default: [] },
});

const User = model("User", userSchema);
module.exports = User;
