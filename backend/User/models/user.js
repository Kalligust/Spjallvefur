const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatarImageUrl: { type: String, required: false },
  age: { type: String, required: false },
  locationl: { type: String, required: false },
  occupation: { type: String, required: false },
  about: { type: String, required: false },
});

module.exports = mongoose.model("user", userSchema);
