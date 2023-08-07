const { Schema, model, Types } = require("mongoose");

const topicSchema = new Schema({
  name: { type: String, required: true },
});

const Topic = model("Topic", topicSchema);
module.exports = Topic;
