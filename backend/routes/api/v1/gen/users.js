const express = require("express");
const router = express.Router();
const userController = require("../../../../controllers/userControllers");

router.get("/all", userController.getAllUsers);

//register route
router.post("/register", userController.register);

//login route
router.post("/login", userController.login);

module.exports = router;
