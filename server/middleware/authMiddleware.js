/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../model/userModel.js'

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token; // Déclaration au début

  try {
    // Récupérer le token des headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(' ')[1]; // Assignation
    }

    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Récupérer l'utilisateur à partir du token
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error('Not authorized');
  }
});

export default protect;

