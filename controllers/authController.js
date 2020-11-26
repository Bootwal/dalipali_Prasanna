const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/register");

function authController() {
  const _getRedirectUrl = (req) => {
    return req.user.role == 0 ? "/dashboard/dashboard" : "/";
  };

  return {
    login(req, res) {
      res.render("auth/login");
    },
    postLogin(req, res, next) {
      passport.authenticate("local-signin", (err, user, info) => {
        if (err) {
          req.flash("error_msg", "Something went wrong!!!");
          return next(err);
        }
        if (!user) {
          // req.flash("error_msg", "User Not found");
          return res.redirect("/auth/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error_msg", "Something went wrong!!!");
            return next(err);
          }
          return res.redirect(_getRedirectUrl(req));
        });
      })(req, res, next);
    },
    register(req, res) {
      res.render("auth/register");
    },
    postRegister(req, res, next) {
      console.log(req.body.email);
      passport.authenticate("local-signup", {
        failureRedirect: "/auth/register",
        successRedirect: "/auth/login",
        failureFlash: true,
        session: false,
      })(req, res, next);
    },
    logout(req, res) {
      req.session.destroy();
      return res.redirect("/auth/login");
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
