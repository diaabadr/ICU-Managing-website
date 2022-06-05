var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users").router;
const profile = require("./routes/profile");
const nurse = require("./routes/nurse");
const doctor = require("./routes/doctor");
var app = express();
require("./config/passport");
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const { config } = require("process");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("views/user", path.join(__dirname, "views/user"));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "ICU-Managing-website_?@!",
    saveUninitialized: false,
    resave: true,
    proxy: true,
    path: "/",
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1/ICU-Managing-website",
      collectionName: "sessions",
    }),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/receptionist", profile);
app.use("/nurse", nurse);
app.use("/doctor", doctor);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
mongoose.connect(
  "mongodb://127.0.0.1/ICU-Managing-website",
  { useNewUrlParser: true },
  (error) => {
    if (error) console.log(error);
    else console.log("Database Connected Successfully");
  }
);
module.exports = app;
