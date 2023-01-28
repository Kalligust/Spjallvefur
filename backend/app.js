const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRouter = require("./User/user-Routes");
const threadRouter = require("./Thread/thread-routes");
const imageRouter = require("./ImageUpload/image-Routes");
const HttpError = require("./models/http-error");

const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  console.log(res.getHeaders());
  next();
});

app.use(userRouter);
app.use(threadRouter);
app.use(imageRouter);

app.use((req, res, next) => {
  const error = new HttpError(`Could not find this route. ${req.url}`, 404);
  throw error;
});

app.use((error, req, res, next) => {
  console.log("Ble");
  console.log(error);
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknow error occured" });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  }
  console.log(`localhost:${PORT}`);
});
