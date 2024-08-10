// import { Routes, Route, Navigate } from "react-router-dom";
// import React, {  useEffect } from "react";
// import "./App.css";
// import Login from "./Pages/Login";
// import Register from "./Pages/register";
// import Home from "./Pages/Home";
// import Navbar from "./Components/Navbar";
// import { isAuthenticated } from "./auth";
// import ProtectedRoute from "./ProtectedRoute";
// function App() {
//   const username = localStorage.getItem("username");
//   const ChatInitiator = localStorage.getItem("ChatInitiator");
//   useEffect(() => {
//     if (ChatInitiator !== username) {
//       localStorage.removeItem("chatMessages");
//     }
//   }, [username,ChatInitiator]);
//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         <Route
//           path="/login"
//           element={isAuthenticated() ? <Navigate to="/"  /> : <Login />}
//         />
//         <Route
//           path="/register"
//           element={
//             isAuthenticated() ? <Navigate to="/"  /> : <Register />
//           }
//         />
//         {/* Protecting the home route */}
//         <Route path="/" element={<ProtectedRoute element={Home} />} />
//         <Route path="*" element={<Navigate to="/"  />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/register";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import { isAuthenticated } from "./auth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const username = localStorage.getItem("username");
  const ChatInitiator = localStorage.getItem("ChatInitiator");

  useEffect(() => {
    if (ChatInitiator !== username) {
      localStorage.removeItem("chatMessages");
    }
  }, [username, ChatInitiator]);

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route
            path="/login"
            render={() =>
              isAuthenticated() ? <Redirect to="/" /> : <Login />
            }
          />
          <Route
            path="/register"
            render={() =>
              isAuthenticated() ? <Redirect to="/" /> : <Register />
            }
          />
          {/* Protecting the home route */}
          <ProtectedRoute exact path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

