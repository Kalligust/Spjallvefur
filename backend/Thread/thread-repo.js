const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");
const post = require("./models/post");
const thread = require("./models/thread");
const database = process.env.DATABASE;
mongoose
  .connect(database)
  .then(() => {
    console.log("connected to database thread");
  })
  .catch((e) => {
    console.log("connection failed thread");
    console.log(e);
  });

const createReply = async (req, res, next) => {
  const postId = uuidv4();
  const currentTime = Date.now();
  const newPost = new post({
    postId: postId,
    threadId: req.body.threadId,
    text: req.body.text,
    username: req.body.username,
    userId: req.body.userId,
    timePosted: currentTime,
  });

  let result;
  try {
    result = await newPost.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Could not create reply. Try again later", 500);
    return next(error);
  }

  //Now to update the last activity field in thread
  const filter = { threadId: req.params.threadId };
  const updateDoc = {
    $set: {
      lastActivity: currentTime,
    },
  };

  try {
    const response = await thread.updateOne(filter, updateDoc);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "could not update last activity. Try again later",
      500
    );
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
  const currentTime = Date.now();

  const newThread = new thread({
    threadId: threadId,
    threadTitle: req.body.title,
    username: req.body.username,
    userId: req.body.userId,
    timePosted: currentTime,
    lastActivity: currentTime,
  });

  let threadResult;
  try {
    threadResult = await newThread.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("something went wrong. Try again later", 500);
    return next(error);
  }

  const postId = uuidv4();

  const newPost = new post({
    postId: postId,
    threadId: threadId,
    text: req.body.text,
    username: req.body.username,
    userId: req.body.userId,
    timePosted: currentTime,
  });

  let postResult;
  try {
    postResult = await newPost.save();
  } catch (err) {
    console.log(err);
    //If post fails to be saved after thread has been successfully saved
    //thread needs to be deleted to maintain consistency between collections
    await newThread.deleteOne({ threadId: newThread.threadId });
    const error = new HttpError(
      "something went wrong Posting post. Try again later",
      500
    );
    return next(error);
  }
  res.json(postResult);
};

const getThreads = async (req, res, next) => {
  let threads;
  try {
    threads = await thread.find().sort({ lastActivity: -1 });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Couldn't retrieve threads from database. Try again later",
      500
    );
    return next(error);
  }
  res.json(threads.map((t) => t.toObject({ getters: true })));
};

const getPostsFromThreadId = async (req, res, next) => {
  let posts;
  try {
    posts = await post.find({ threadId: req.params.id });
  } catch (err) {
    console.log(err);
    const error = new HttpError("something went wrong. Try again later", 500);
    return next(error);
  }
  res.json(posts.map((p) => p.toObject({ getters: true })));
};

const getPostFromId = async (req, res, next) => {
  const { postId } = req.query;
  let result;
  try {
    result = await post.findOne({ postId: postId });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "something went wrong retrieving post. Try again later",
      500
    );
    return next(error);
  }

  res.json(result);
};

const editPost = async (req, res, next) => {
  const editedText = req.body.text;
  console.log(editedText);
  const filter = { postId: req.body.postId };
  const updateDoc = {
    $set: {
      text: editedText,
    },
  };

  let response;
  try {
    response = await post.updateOne(filter, updateDoc);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "could not update last activity. Try again later",
      500
    );
    return next(error);
  }
  console.log(response);
  res.json(response);
};

exports.createReply = createReply;
exports.createThread = createThread;
exports.getThreads = getThreads;
exports.getPostsFromThreadId = getPostsFromThreadId;
exports.getPostFromId = getPostFromId;
exports.editPost = editPost;
