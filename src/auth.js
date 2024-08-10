// auth.js
export const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return !!token; // Returns true if the token exists, otherwise false
  };


  export const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    // Redirect to login or home page
  };