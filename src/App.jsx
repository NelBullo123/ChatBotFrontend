import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Chatbot from './components/Chatbot';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './components/Admin';  // Import the Admin component

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/admin" element={<Admin />} /> {/* New Route for Admin */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
