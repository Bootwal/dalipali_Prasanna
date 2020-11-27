const express = require("express");
const app = require("../app");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const isAdminLoggedIn = require("../controllers/middlewares/admin");

//dashboard routes here
router.get("/dashboard", isAdminLoggedIn, dashboardController().dashboard);

//category route here
router.get("/category", isAdminLoggedIn, dashboardController().category);

router.get("/addCategory", isAdminLoggedIn, dashboardController().addCategory);

module.exports = router;
