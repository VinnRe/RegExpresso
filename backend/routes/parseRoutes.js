const express = require("express");
const router = express.Router();
const parseController = require("../controllers/fsmController.js");
const userController = require("../controllers/userController.js");

router.route("/NFA").post(parseController.parseNFA);
router.route("/DFA").post(parseController.parseDFA);
router.route("/visualizeNFA").post(parseController.visualizeNFA);
router.route("/visualizeDFA").post(parseController.visualizeDFA);
router.route("/tuples").post(parseController.to5Tuples);
router.route("/save").post(userController.protect, parseController.saveRegEx);
router.route("/delete/:id").delete(userController.protect, parseController.deleteRegEx);
router.route("/fetchAll").get(userController.protect, parseController.fetchAllRegEx);



module.exports = router;