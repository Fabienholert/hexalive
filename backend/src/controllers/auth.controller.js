const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Générer un token JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs",
      error: error.message,
    });
  }
};

// Inscription
exports.register = async (req, res) => {
  try {
    const {
      email,
      password,
      username,
      ville,
      codePostal,
      facebook,
      instagram,
      tiktok,
    } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // Créer un nouvel utilisateur
    const user = new User({
      email,
      password,
      username,
      ville,
      codePostal,
      facebook,
      instagram,
      tiktok,
    });

    await user.save();

    // Générer le token
    const token = generateToken(user._id);

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        ville: user.ville,
        codePostal: user.codePostal,
        facebook: user.facebook,
        instagram: user.instagram,
        tiktok: user.tiktok,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'inscription", error: error.message });
  }
};

// Connexion
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Générer le token
    const token = generateToken(user._id);

    res.json({
      message: "Connexion réussie",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        ville: user.ville,
        codePostal: user.codePostal,
        facebook: user.facebook,
        instagram: user.instagram,
        tiktok: user.tiktok,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la connexion", error: error.message });
  }
};

// Obtenir le profil de l'utilisateur connecté
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération du profil",
      error: error.message,
    });
  }
};

// Mettre à jour le profil
exports.updateProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      "username",
      "ville",
      "codePostal",
      "facebook",
      "instagram",
      "tiktok",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ message: "Mises à jour non valides" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).send();
    }
    updates.forEach((update) => {
      if (allowedUpdates.includes(update)) {
        user[update] = req.body[update];
      }
    });

    await user.save();
    res.json({
      message: "Profil mis à jour avec succès",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        ville: user.ville,
        codePostal: user.codePostal,
        facebook: user.facebook,
        instagram: user.instagram,
        tiktok: user.tiktok,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la mise à jour du profil",
      error: error.message,
    });
  }
};
