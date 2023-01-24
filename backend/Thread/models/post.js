const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  postId: { type: String, required: true },
  threadId: { type: String, required: true },
  text: { type: String, required: true },
  username: { type: String, required: true },
  userId: { type: String, required: true },
  timePosted: { type: Date, required: true },
});

module.exports = mongoose.model("post", postSchema);
