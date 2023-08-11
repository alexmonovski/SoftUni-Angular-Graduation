const { Schema, model, Types } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const topicSchema = new Schema({
  title: { type: String, required: true, unique: true },
  articles: { type: [Types.ObjectId], ref: "Article", default: [] },
  subscribers: { type: [Types.ObjectId], ref: "User", default: [] },
});

topicSchema.plugin(uniqueValidator);
const Topic = model("Topic", topicSchema);
module.exports = Topic;
