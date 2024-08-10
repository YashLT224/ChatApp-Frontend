import { Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
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
  }, [username,ChatInitiator]);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/"  /> : <Login />}
        />
        <Route
          path="/register"
          element={
            isAuthenticated() ? <Navigate to="/"  /> : <Register />
          }
        />
        {/* Protecting the home route */}
        <Route path="/" element={<ProtectedRoute element={Home} />} />
        <Route path="*" element={<Navigate to="/"  />} />
      </Routes>
    </div>
  );
}

export default App;
