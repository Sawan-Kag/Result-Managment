const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const express = require("express");
var session = require("express-session");

var path = require("path");

var db = require("./models");

var Teacher = db.teachers;
var indexRouter = require("./routes/index");
var teacherRouter = require("./routes/teacher");
var studentRouter = require("./routes/student");

const app = express();
const port = 3000;

// const authTokens = {};
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//static file
app.use(express.static("public"));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

app.get("/login", function (req, res, next) {
  res.render("./login", { title: "Teacher Login", message: null });
});

var session = require("express-session");
app.use(session({ secret: "secret-code", cookie: { maxAge: 60000 } }));
var checkUser = function (req, res, next) {
  const userName = req.body.userName;
  const password = req.body.password;
  if (req.session.loggedIn) {
    next();
  } else {
    if (userName != undefined && password != undefined) {
      const teacher = Teacher.findOne({
        where: {
          userName: userName,
          password: password,
        },
      }).then((result) => {
        console.log(result);
        if (result != null) {
          req.session.loggedIn = true;
          res.status(200).send("/teacher");
        } else {
          res.status(200).send(false);
        }
      });
    } else {
      res.render("./login", {
        title: "login as",
        message: "Pleas Login First ",
      });
    }
  }
};
app.get("/logout", (req, res) => {
  req.session.loggedIn = false;
  res.header("Cache-Control", "no-cache", "no-store", "must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  req.session.destroy();

  res.redirect("/");
});

app.use("/", indexRouter);
app.use("/teacher", checkUser, teacherRouter);
app.use("/student", studentRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = "Page " + err.message + " At " + req.url;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Result Managment app listening on port ${port}`);
});
