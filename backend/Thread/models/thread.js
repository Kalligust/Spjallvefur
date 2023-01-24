const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const threadSchema = new Schema({
  threadId: { type: String, required: true },
  threadTitle: { type: String, required: true },
  username: { type: String, required: true },
  userId: { type: String, required: true },
  timePosted: { type: Date, required: true },
  lastActivity: { type: Date, required: true },
});

module.exports = mongoose.model("thread", threadSchema);
