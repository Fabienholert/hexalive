const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Routes
const authRoutes = require("./routes/auth.routes");

// Configuration
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur de connexion à MongoDB:", err));

// Test de la connexion
mongoose.connection.on("connected", () => {
  console.log("Mongoose est connecté");
});

mongoose.connection.on("error", (err) => {
  console.error("Erreur Mongoose:", err);
});

// Routes
app.use("/api/auth", authRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Une erreur est survenue !", error: err.message });
});

module.exports = app;
