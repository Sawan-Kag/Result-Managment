const db = require("../models");
const express = require("express");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const Teacher = db.teachers;
const app = express();

const authTokens = {};

app.use(cookieParser());

app.use((req, res, next) => {
  const authToken = req.cookies["AuthToken"];
  req.user = authTokens[authToken];
  next();
});

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString("hex");
};

const teacherLogin = async (req, res) => {
  const { userName, password } = req.body;
  let user = await Teacher.findOne({
    where: {
      userName: userName,
      password: password,
    },
  });

  if (user) {
    const authToken = generateAuthToken();
    authTokens[authToken] = userName;
    res.cookie("AuthToken", authToken);
    res.status(200).send("/teacher");
    return;
  } else {
    res.status(200).send(false);
  }
};

module.exports = {
  teacherLogin,
};
