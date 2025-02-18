/* eslint-disable no-unused-vars */
import axios from 'axios'
import jwt from 'jsonwebtoken'

const registerUser = ()=>{
  const {name, email, password} = userData

  const token = jwt.generateToken()
}
