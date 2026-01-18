import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateNote from './pages/CreateNote';
import Login from './pages/login';
import Register from './pages/register';
import ViewNotes from './pages/ViewNotes';
import MoodAnalysis from './pages/MoodAnalysis';
import Settings from './pages/Settings';

// Helper Component: Checks if you are logged in
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  return token ? children : null;
};

// Helper Component: Hides Navbar on Login/Register pages
const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  return (
    <div className="app-container">
      {!isAuthPage && <Navbar />}
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes (Require Login) */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/create" element={<ProtectedRoute><CreateNote /></ProtectedRoute>} />
          <Route path="/view" element={<ProtectedRoute><ViewNotes /></ProtectedRoute>} />
          <Route path="/analysis" element={<ProtectedRoute><MoodAnalysis /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;