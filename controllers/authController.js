const express = require("express");
const app = express();
let passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/register");

function authController() {
  const _getRedirectUrl = (req) => {
    return req.user.role == 0 ? "/dashboard" : "/";
  };
  return {
    login(req, res) {
      res.render("auth/login");
    },
    postLogin(req, res, next) {
      passport.authenticate("local-signin", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          return res.redirect(_getRedirectUrl(req));
        });
      })(req, res, next);
    },
    register(req, res) {
      res.render("auth/register");
    },
    postRegister(req, res) {
      passport.authenticate("local-signup", {
        failureRedirect: "/register",
        successRedirect: "/login",
        session: true,
      });
    },
    logout(req, res) {
      req.logout();
      return res.redirect("/login");
    },
  };
}

module.exports = authController;

// exports.login = (req, res) => {
//   res.render("auth/login");
// };

// exports.postLogin = passport.authenticate("local-signin", {
//   failureRedirect: "/login",
//   successRedirect: _getRedirectURL,
//   session: true,
// });

// exports.register = (req, res) => {
//   res.render("auth/register");
// };

// exports.postRegister = passport.authenticate("local-signup", {
//   failureRedirect: "/register",
//   successRedirect: "/login",
//   session: true,
// });

// exports.logout = (req, res) => {
//   req.session.destroy();
//   res.redirect("/");
// };
