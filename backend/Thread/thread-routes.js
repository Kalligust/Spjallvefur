const express = require("express");
const { MongoClient } = require("mongodb");

const threadRepo = require("./thread-repo");
const HttpError = require("../models/http-error");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/createThread", threadRepo.createThread);
router.get("/threads", threadRepo.getThreads);
router.get("/threads/:id", threadRepo.getPosts);
router.post("/createreply/:id", threadRepo.createReply);
// router.use(checkAuth);

module.exports = router;
