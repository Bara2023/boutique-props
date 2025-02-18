/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"

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

  return (
    <>
      <section className="heading">
        <FaUser/> Register
        <h1>Please create an account</h1>
      </section>

      <section className="form">
        <form >
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
        </form>
      </section>
    </>
  )
}

export default Register
