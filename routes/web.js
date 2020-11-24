const express = require("express");
const app = require("../app");
const router = express.Router();
const authController = require("../controllers/authController");
const dashboardController = require("../controllers/dashboardController");

//routes here
router.get("/", (req, res) => {
  res.render("index");
});

// authentication routes here
router.get("/login", authController().login);

router.post("/login", authController().postLogin);

router.get("/register", authController().register);

router.post("/register", authController().postRegister);

router.get("/logout", authController().logout);

//dashboard routes here
router.get("/dashboard", dashboardController.dashboard);

module.exports = router;
