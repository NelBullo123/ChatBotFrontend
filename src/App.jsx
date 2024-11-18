import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Startpage from "./components/Startpage"; // Import Startpage
import Chatbot from "./components/Chatbot";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Startpage />} /> {/* Startpage as default */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
