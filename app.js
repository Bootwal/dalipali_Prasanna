require("dotenv").config();

const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const webRoutes = require("./routes/web");

const db = require("./database/connection");
const session = require("express-session");
const flash = require("connect-flash");
const bodyparser = require("body-parser");
const MySQLStore = require("express-mysql-session")(session);

//setting up templating engine
app.set("view engine", "hbs");
app.engine("hbs", exphbs({ defaultLayout: "mainLayout.hbs" }));

app.use(express.static("public"));

app.use(bodyparser.urlencoded({ extended: true }));

//setting up session store
const sessionStore = new MySQLStore(
  {
    expiration: 10000000,
    createDatabaseTable: true,
    schema: {
      tableName: "users_sessions",
      columnNames: {
        session_id: "session_id",
        expires: "expires",
        data: "data",
      },
    },
  },
  db
);

//setup session and flash
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    store: sessionStore,
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
