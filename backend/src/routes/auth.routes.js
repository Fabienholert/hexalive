const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const auth = require("../middleware/auth.middleware");

// Routes pour l'authentification
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/profile", auth, authController.getProfile);
router.put("/auth/profile", auth, authController.updateProfile);

// Nouvelle route pour récupérer tous les utilisateurs
// Cette route ne nécessite pas d'authentification, mais vous pouvez l'ajouter si nécessaire
router.get("/users", authController.getAllUsers);

module.exports = router;
