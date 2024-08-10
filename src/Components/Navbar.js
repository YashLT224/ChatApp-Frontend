import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {  logout } from '../auth'

const Navbar = ({authenticated,setAuthentication}) => {
  const history = useHistory();
  const username = localStorage.getItem('username');


  const handleLogout = () => {
    logout();
    setAuthentication(false)
    history.push('/login');
  };
 

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MyChat App</Link>
      </div>
      <div className="navbar-links">
        {authenticated ? (
          <>
            <span className="navbar-username">Hello, {username}</span>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;