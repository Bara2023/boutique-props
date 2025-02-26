/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

 const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Aucun token fourni.' });
  }

  const token = authHeader.split(' ')[1]
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
          return res.status(401).json({ message: 'Utilisateur non trouvé.' });
      }

      req.user = user; // Assigne l'utilisateur à req.user
      next();
  } catch (error) {
      return res.status(401).json({ message: 'Token invalide.' });
  }
};

export default protect
