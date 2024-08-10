import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';
import { ButtonLoader } from '../Components/ButtonLoader';
import axios from 'axios';
import { useHistory } from "react-router-dom";
const Login = ({ setAuthentication}) => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const validateInputs = () => {
        const errors = {};
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errors.email = "Invalid email address.";
        }
    
        if (password.length < 6) {
          errors.password = "Password must be at least 6 characters.";
        }
    
        return errors;
      };
      const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setValidationErrors({});
    
        const errors = validateInputs();
        if (Object.keys(errors).length > 0) {
          setValidationErrors(errors);
          setLoading(false);
          return;
        }
    
        try {
          const response = await axios.post('https://certain-light-b0ac84b0f3.strapiapp.com/api/auth/local', {
            identifier: email,
            password
          });
    
          // If login is successful
          if (response.status === 200) {
            // Save user details and token to local storage
            localStorage.setItem('authToken', response.data.jwt);
            localStorage.setItem('username', response.data.user.username);
            localStorage.setItem('email', response.data.user.email);
            setAuthentication(true)
            history.push('/');  // Redirect to home page
          }
        } catch (err) {
          setError('Login failed. Please check your credentials and try again.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
  return (
    <>
    <div className="authcontainer">
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className="form-content-wrapper">
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {validationErrors.email && <p className="error-message">{validationErrors.email}</p>}
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {validationErrors.password && <p className="error-message">{validationErrors.password}</p>}
            {error && <p className="error-message">{error}</p>}
            {loading ? (
              <ButtonLoader />
            ) : (
              <button id="loginButton" type="submit">Submit</button>
            )}
            <span className="signup-span">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
</>
  )
}

export default Login
