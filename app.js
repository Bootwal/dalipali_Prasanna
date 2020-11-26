require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const webRoutes = require("./routes/web");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const db = require("./database/connection");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const bodyparser = require("body-parser");
// const MySQLStore = require("express-mysql-session")(session); // doesn't work with sequelize
// const SessionStore = require("express-session-sequelize")(session.Store);
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//setting up templating engine
const hbs = exphbs.create({
  defaultLayout: "mainLayout",
  extname: ".hbs",
  partialsDir: __dirname + "/views/partials",
  //create helpers
  helpers: {
    ifEquals: function (arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    },
    dec: function (value, options) {
      return parseInt(value) - 1;
    },
    ifG: function (arg1, options) {
      return arg1 > 0 ? options.fn(this) : options.inverse(this);
    },
    if_eq: function (a, b, opts) {
      if (a === b)
        // Or === depending on your needs
        return opts.fn(this);
      else return opts.inverse(this);
    },
    inc: function (value, options) {
      return parseInt(value) + 1;
    },
  },
});
app.set("view engine", "hbs");
app.engine("hbs", hbs.engine);

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.static(path.join(__dirname, "/public2")));

app.use(bodyparser.urlencoded({ extended: true }));

//setting up session store
var myStore = new SequelizeStore({
  db: db,
  tableName: "sessions",
  checkExpirationInterval: 15 * 60 * 60 * 1000,
  expiration: 12 * 60 * 60 * 1000,
});

//setup session and flash
app.use(
  session({
    key: "session_cookie_name",
    secret: "thisissecret",
    store: myStore,
    saveUninitialized: true,
    resave: true,
    rolling: true,
    maxAge: 600000000000,
    cookie: { maxAge: 60000000000 },
  })
);
app.use(flash());

// const passportInit=require('./auth/passport');
let passportConfig = require("./auth/passport");
passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.error_msg = req.flash("error_msg");
  res.locals.success_msg = req.flash("success_msg");
  res.locals.user_id = req.session.user_id;
  next();
});

//routes
app.use(webRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoutes);

module.exports = app;
