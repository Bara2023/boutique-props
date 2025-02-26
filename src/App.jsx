import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Header from "./component/Header";
import CreateProduct from './pages/CreateProduct'
import MyProducts from './pages/MyProducts'
import AllProducts from './pages/AllProducts'



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // ✅ Vérifie le token au chargement
  }, []);

  return (
    <Router>
      <div className="container">
        <Header setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/my-products" element={<MyProducts />} />
          <Route path="/offers" element={<AllProducts />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
