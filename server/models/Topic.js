const { Schema, model, Types } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const topicSchema = new Schema({
  name: { type: String, required: true, unique: true },
  articles: { type: [Types.ObjectId], ref: "Article", default: [] },
});

topicSchema.plugin(uniqueValidator);
const Topic = model("Topic", topicSchema);
module.exports = Topic;
