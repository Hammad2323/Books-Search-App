// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import FavoritesPage from './components/FavoritesPage';

// Create a root element using React 18 API
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/favorites" element={<FavoritesPage />} />
    </Routes>
  </Router>
);