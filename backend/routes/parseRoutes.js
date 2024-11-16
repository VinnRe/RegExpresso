const express = require("express");
const router = express.Router();
const parseController = require("../controllers/fsmController.js");

router.route("/NFA").post(parseController.parseNFA);
router.route("/DFA").post(parseController.parseDFA);
router.route("/visualizeFSM").post(parseController.visualizeFSM);

module.exports = router;