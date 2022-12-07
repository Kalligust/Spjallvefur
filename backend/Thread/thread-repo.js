const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");
const post = require("./models/post");
const thread = require("./models/thread");
const databaseKey = process.env.DATABASE_KEY;
mongoose
  .connect(
    `mongodb+srv://kalligust:${databaseKey}@cluster0.rrkjwy9.mongodb.net/forum?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch((e) => {
    console.log("connection failed");
    console.log(e);
  });

const createReply = async (req, res, next) => {
  const newPost = new post({
    threadId: req.params.id,
    text: req.body.text,
    username: req.body.username,
    userId: req.body.userId,
    timePosted: Date.now(),
  });

  let result;
  try {
    result = await newPost.save();
  } catch (err) {
    const error = new HttpError("something went wrong. Try again later", 500);
    return next(error);
  }
  res.json(result);
};

/**
 * When a user creates a new thread this method adds new entries into two
 * collections, a list of individual threads and a list of all posts made
 * on the forum.
 */
const createThread = async (req, res, next) => {
  const threadId = uuidv4();

  const newThread = new thread({
    threadId: threadId,
    threadTitle: req.body.title,
    username: req.body.username,
    userId: req.body.userId,
    timePosted: Date.now(),
  });

  let result;
  try {
    result = await newThread.save();
  } catch (err) {
    const error = new HttpError("something went wrong. Try again later", 500);
    return next(error);
  }

  const newPost = new post({
    threadId: threadId,
    text: req.body.text,
    username: req.body.username,
    userid: req.body.userId,
    timePosted: Date.now(),
  });

  result;
  try {
    result = await newPost.save();
  } catch (err) {
    //If post fails to be saved after thread has been successfully saved
    //thread needs to be deleted to maintain consistency between collections
    await newThread.deleteOne({ threadId: newThread.threadId });
    const error = new HttpError(
      "something went wrong Posting post. Try again later",
      500
    );
    return next(error);
  }
  res.json(result);
};

const getThreads = async (req, res, next) => {
  console.log("getThreadas");
  let threads;
  try {
    threads = await thread.find();
  } catch (err) {
    const error = new HttpError("something went wrong. Try again later", 500);
    return next(error);
  }
  res.json(threads.map((t) => t.toObject({ getters: true })));
};

const getPosts = async (req, res, next) => {
  let posts;
  try {
    posts = await post.find({ threadId: req.params.id });
  } catch (err) {
    const error = new HttpError("something went wrong. Try again later", 500);
    return next(error);
  }
  res.json(posts.map((p) => p.toObject({ getters: true })));
};

exports.createReply = createReply;
exports.createThread = createThread;
exports.getThreads = getThreads;
exports.getPosts = getPosts;
