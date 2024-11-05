const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/signup").post(userController.signup);
router.route("/login").post(userControllerController.login);
router.route('/logout').post(userController.protect, authController.logout);

module.exports = router;