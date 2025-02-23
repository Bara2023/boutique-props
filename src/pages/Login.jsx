/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) { // 🔥 Ajoute setIsAuthenticated en prop
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", formData);

      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("token", response.data.token); // ✅ Stocke aussi le token

      toast.success("User connecté avec succès");

      setIsAuthenticated(true); // ✅ Met à jour l’état global après connexion

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

      console.log("Réponse de l'API :", response.data);
    } catch (error) {
      console.log(error);
      toast.error("Échec de la connexion");
    }
  };

  return (
    <>
      <section className="heading">
        <FaUser /> Login
        <h1>Please log into your account</h1>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="Please enter your email"
              onChange={onChange}
            />

            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Please enter your password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
}

export default Login;
