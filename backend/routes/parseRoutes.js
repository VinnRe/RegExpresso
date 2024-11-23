const express = require("express");
const router = express.Router();
const parseController = require("../controllers/fsmController.js");

router.route("/NFA").post(parseController.parseNFA);
router.route("/DFA").post(parseController.parseDFA);
router.route("/visualizeNFA").post(parseController.visualizeNFA);
router.route("/visualizeDFA").post(parseController.visualizeDFA);
router.route("/tuples").post(parseController.to5Tuples);

module.exports = router;