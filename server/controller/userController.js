/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import expressAsyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = expressAsyncHandler(async (req, res)=>{
  const {name, email, password} = req.body

  const userExists = await User.findOne({email})

  if (userExists) {
    res.status(400)
    return console.log('user déjà existant, veuillez vous connecter');
  } else {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    })

    if (newUser) {
      res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: generateToken(newUser._id),
      message: 'user successfully created !'
      })
    }
  }
})

export const loginUser = expressAsyncHandler (async (req, res)=>{
  const {email, password} = req.body

  const user = await User.findOne({email})

  if (user && (await bcrypt.compare(password, user.password  ))) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      token: generateToken(user._id),
      message: 'user successfully connected !'
    })
  } else {
    res.status(400).json({
      message: "email ou mot de passe incorrect"
    })
  }
})

export const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: "30d"
  })
}

export const getCurrentUser = expressAsyncHandler (async (req, res) =>{
  const user = {
    id: req.user._id,
    name: req.user.name,
    email:req.user.email
  }
  res.status(200).json(user)
})
