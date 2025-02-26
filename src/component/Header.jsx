/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { MdDashboard } from "react-icons/md"

function Header({setIsAuthenticated}) {
  const navigate = useNavigate()

    const handleLogout = () =>{
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    navigate('/login')
    console.log('Déconnexion avec succès')
  }

  return (
    <>
    <header className="header">
      <div className="logo">
        <Link to="/">Ma Boutique</Link>
      </div>
        <ul>
          <li>
            <Link to="/register">
              <FaSignInAlt/> Register
            </Link>
          </li>
          <li>
            <Link to="/login">
              <FaUser/> Login
            </Link>
          </li>
          <li onClick={handleLogout}>
            <Link to="/login">
              <FaSignOutAlt/> Logout
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
             <MdDashboard/> Dashboard
            </Link>
          </li>
        </ul>
    </header>
    </>
  )
}

export default Header
