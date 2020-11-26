const express = require("express");
const app = require("../app");
const router = express.Router();
const webController = require("../controllers/webController");

//routes here
router.get("/", webController().index);

module.exports = router;
