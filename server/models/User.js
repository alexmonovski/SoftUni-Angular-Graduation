const { Schema, model, Types } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  password: { type: String, required: true },
  topics: { type: [Types.ObjectId], ref: "Topic", default: [] },
  articlesCreated: { type: [Types.ObjectId], ref: "Article", default: [] },
  articlesLiked: { type: [Types.ObjectId], ref: "Article", default: [] },
  subscribedTo: { type: [Types.ObjectId], ref: "User", default: [] },
  subscriptions: { type: [Types.ObjectId], ref: "User", default: [] },
});

userSchema.plugin(uniqueValidator);
userSchema.pre("save", async function () {
  const hashedPass = await bcrypt.hash(this.password, 10);
  this.password = hashedPass;
});
const User = model("User", userSchema);
module.exports = User;
