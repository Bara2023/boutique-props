/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import expressAsyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ✅ Enregistrement d'un utilisateur
export const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log("📩 Tentative d'inscription :", email);

  const userExists = await User.findOne({ email });

  if (userExists) {
    console.log("🚨 Utilisateur déjà existant :", email);
    return res.status(400).json({ message: 'Utilisateur déjà existant, veuillez vous connecter' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (newUser) {
    console.log("✅ Utilisateur créé :", newUser.email);
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
      message: 'Utilisateur créé avec succès !',
    });
  } else {
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
});

// ✅ Connexion d'un utilisateur
export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("🔑 Tentative de connexion :", email);

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    console.log("✅ Connexion réussie :", email);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: 'Utilisateur connecté avec succès !',
    });
  } else {
    console.log("Connexion échouée :", email);
    res.status(400).json({ message: "Email ou mot de passe incorrect" });
  }
});

// Génération du token JWT
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Récupération de l'utilisateur courant (nécessite `protect`)
export const getCurrentUser = expressAsyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Utilisateur non trouvé" });
  }

  console.log("🆔 Utilisateur actuel :", req.user.email);

  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
});
