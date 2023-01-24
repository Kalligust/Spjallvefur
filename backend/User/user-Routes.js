const express = require("express");
const { MongoClient } = require("mongodb");

const userRepo = require("./user-Repo");
const HttpError = require("../models/http-error");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", userRepo.createUser);
router.post("/signin", userRepo.signIn);
router.get("/getUserByUsername", userRepo.getUserByUsername);
// router.use(checkAuth);

module.exports = router;
