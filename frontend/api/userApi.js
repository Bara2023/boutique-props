/* eslint-disable no-unused-vars */
import axios from 'axios'
import jwt from 'jsonwebtoken'

const getCurrentUser = async (userData)=>{
  const response = await axios.post("http://localhost:5000/api/users/register")
  return response.data
}

const loginUser = async (userData) =>{
  const response = axios.post("http://localhost:5000/api/users/login")
  return response.data
}
