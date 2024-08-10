import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { isAuthenticated, logout } from '../auth'

const Navbar = () => {
  const history = useHistory();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MyChat App</Link>
      </div>
      <div className="navbar-links">
        {isAuthenticated() ? (
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