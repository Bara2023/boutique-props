import './App.css';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx'
import Login from "./pages/Login.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header.jsx';

function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
