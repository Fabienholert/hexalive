const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");

// Routes publiques
router.post("/register", authController.register);
router.post("/login", authController.login);

// Routes protégées
router.get("/profile", auth, authController.getProfile);
router.put("/profile", auth, authController.updateProfile);

module.exports = router;
