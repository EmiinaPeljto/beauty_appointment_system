const express = require("express");
const router = express.Router();
const userController = require("../../../../controllers/userControllers");

router.get("/all", userController.getAllUsers);

//register route
router.post("/register", userController.register);

//login route
router.post("/login", userController.login);

//get users full name route
router.get("/full-name/:id", userController.getUsersFullName);

//get user by id route
router.get("/:id", userController.getUserById);

module.exports = router;
