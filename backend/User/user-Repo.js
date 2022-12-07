/**
 * Kalla þennan module userRepo með vísun í repository fyrir user database. Mögulega væri userController betra nafn
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const user = require("./models/user");

const databaseKey = process.env.DATABASE_KEY;
const tokenKey = process.env.TOKEN_KEY;

mongoose
  .connect(
    `mongodb+srv://kalligust:${databaseKey}@cluster0.rrkjwy9.mongodb.net/forum?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected to database");
  })
  .catch(() => {
    console.log("connection failed");
  });

//Add new user to user database
const createUser = async (req, res, next) => {
  const { username, password } = req.body;

  //Check if email is already registered
  let existingUser;
  try {
    existingUser = await user.findOne({ username: username });
  } catch (err) {
    const error = new HttpError("A problem occured", 500);
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError("User already exists", 422);
    return next(error);
  }

  //Encrypt password for save storage in database
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError("Something went wrong. Try again later", 500);
    return next(error);
  }

  const createdUser = new user({
    username: username,
    password: hashedPassword,
  });

  let result;
  try {
    result = await createdUser.save();
  } catch (err) {
    const error = new HttpError("something went wrong. Try again later", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, username: createdUser.username },
      tokenKey,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Could not create user. Try again later", 500);
    return next(error);
  }

  res.status(201).json({
    userId: createdUser.id,
    username: createdUser.username,
    token: token,
  });
};

const signIn = async (req, res, next) => {
  const { username, password } = req.body;
  let userLoggingIn;
  try {
    userLoggingIn = await user.findOne({ username: username });
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  if (!userLoggingIn) {
    const error = new HttpError("Username or password incorrect", 401);
    return next(error);
  }

  let isValidPassword;
  try {
    isValidPassword = await bcrypt.compare(password, userLoggingIn.password);
  } catch (err) {
    const error = new HttpError("something went wrong. try again later", 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Username or password incorrect", 401);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: userLoggingIn.id, username: userLoggingIn.username },
      tokenKey,
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError("Could not create user. Try again later", 500);
    return next(error);
  }

  res.status(201).json({
    userId: userLoggingIn.id,
    username: userLoggingIn.username,
    token: token,
  });
};

exports.createUser = createUser;
exports.signIn = signIn;
