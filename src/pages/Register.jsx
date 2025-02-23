/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"
import axios from "axios"
import {toast} from "react-toastify"
import {ToastContainer} from "react-toastify"

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const {name, email, password} = formData

  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = async (e)=>{
    e.preventDefault()
    const response = await axios.post("http://localhost:5000/api/users/register", formData)
    toast.success('user enregistré avec succès !')
    console.log(formData)
  }

  return (
    <>
      <section className="heading">
        <FaUser/> Register
        <h1>Please create an account</h1>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
             type="text"
             className="form-control"
             id="email"
             name="email"
             value={email}
             placeholder="Enter your email"
             onChange={onChange}
             />

            <input
             type="text"
             className="form-control"
             id="name"
             name="name"
             value={name}
             placeholder="Enter your name"
             onChange={onChange}
             />

            <input
             type="text"
             className="form-control"
             id="password"
             name="password"
             value={password}
             placeholder="Enter your password"
             onChange={onChange}
             />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
      <ToastContainer/>
    </>
  )
}

export default Register
