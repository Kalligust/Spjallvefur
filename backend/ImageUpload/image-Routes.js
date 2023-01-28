const express = require("express");
// const { MongoClient } = require("mongodb");

const imageRepo = require("./image-Repo");
// const HttpError = require("../models/http-error");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/uploadImage", imageRepo.uploadImage);
// router.use(checkAuth);

module.exports = router;
