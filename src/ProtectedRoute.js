// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { isAuthenticated } from './auth'; // Ensure the correct path

// const ProtectedRoute = ({ element: Component, ...rest }) => {
//   return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth'; // Ensure the correct path

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;

