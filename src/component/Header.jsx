/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'

function Header() {
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
          <li>
            {/* <Link to="/register">
              <FaSignOutAlt/>
           </Link> */}
          </li>
        </ul>
    </header>
    </>
  )
}

export default Header
