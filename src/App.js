 import { BrowserRouter as Router, Route, Switch, Redirect, } from "react-router-dom";
import React, { useEffect,useState } from "react";
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
 const [authenticated,setAuthentication]=useState(isAuthenticated)
  useEffect(() => {
    if (ChatInitiator !== username) {
      localStorage.removeItem("chatMessages");
    }
  }, [username, ChatInitiator]);


  return (
    <Router>
      <div>
        <Navbar setAuthentication={setAuthentication} authenticated={authenticated}/>
        <Switch>
          <Route
            path="/login"
            render={() =>
              isAuthenticated() ? <Redirect to="/" /> : <Login setAuthentication={setAuthentication} authenticated={authenticated} />
            }
          />
          <Route
            path="/register"
            render={() =>
              isAuthenticated() ? <Redirect to="/" /> : <Register  setAuthentication={setAuthentication} authenticated={authenticated}/>
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

