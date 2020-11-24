require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const exphbs = require("express-handlebars");
const webRoutes = require("./routes/web");
const db = require("./database/connection");
const session = require("express-session");
const flash = require("connect-flash");
const bodyparser = require("body-parser");
// const MySQLStore = require("express-mysql-session")(session); // doesn't work with sequelize
// const SessionStore = require("express-session-sequelize")(session.Store);
const SequelizeStore = require("connect-session-sequelize")(session.Store);

//setting up templating engine
app.set("view engine", "hbs");
app.engine("hbs", exphbs({ defaultLayout: "mainLayout.hbs" }));

app.use(express.static(path.join(__dirname + "/public")));

app.use(bodyparser.urlencoded({ extended: true }));

//setting up session store
var myStore = new SequelizeStore({
  db: db,
  checkExpirationInterval: 15 * 60 * 1000,
  expiration: 12 * 60 * 60 * 1000,
});

//setup session and flash
app.use(
  session({
    key: "session_cookie_name",
    secret: "thisissecret",

    saveUninitialized: true,
    resave: true,
    rolling: true,
    maxAge: 600000000,
    cookie: { maxAge: 600000000 },
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.error_msg = req.flash("error_msg");
  res.locals.success_msg = req.flash("success_msg");
  res.locals.user_id = req.session.user_id;
  res.locals.username = req.session.username;
  next();
});

//routes
app.use(webRoutes);

module.exports = app;
