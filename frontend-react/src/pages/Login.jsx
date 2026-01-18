import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { PenTool, Loader } from 'lucide-react';
import Toast from '../components/Toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new URLSearchParams();
    formData.append('username', email); 
    formData.append('password', password);

    try {
      const response = await axios.post('http://127.0.0.1:8000/token', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      localStorage.setItem('token', response.data.access_token);
      setToastMessage('Login successful! Welcome back!');
      setShowToast(true);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #121212 0%, #1a1a1a 100%)' }}>
      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
      {/* Site Title Header */}
      <div style={{ position: 'absolute', top: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0', color: '#D8B4FE' }}>MoodNotes</h1>
        <p style={{ color: '#A0A0A0', margin: '5px 0 0 0', fontSize: '0.95rem' }}>Track your mood, one note at a time</p>
      </div>

      <div className="card" style={{ width: '400px', textAlign: 'center', padding: '40px', marginTop: '40px', maxWidth: 'calc(100% - 40px)' }}>
        
        {/* Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(216, 180, 254, 0.1)', padding: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <PenTool size={32} color="#D8B4FE" />
          </div>
        </div>

        <h2 style={{ marginBottom: '10px', fontSize: '1.5rem', fontWeight: 'bold' }}>Welcome Back</h2>
        <p style={{ color: '#A0A0A0', marginBottom: '30px', fontSize: '0.95rem' }}>Login to access your MoodNotes</p>

        {error && <div style={{ color: '#ef4444', marginBottom: '15px', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Email (e.g., secure_admin@example.com)" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
          
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ marginTop: '10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            disabled={loading}
          >
            {loading ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Logging in...</> : 'Log In'}
          </button>
        </form>

        <div style={{ marginTop: '25px', fontSize: '0.9rem', color: '#9CA3AF' }}>
          Don't have an account? <Link to="/register" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'underline' }}>Sign Up</Link>
        </div>

      </div>
    </div>
  );
};

// Reusable style for inputs to match your design
const inputStyle = {
  padding: '14px',
  background: '#27272a', // Zinc-800
  border: '1px solid #3f3f46', // Zinc-700
  borderRadius: '8px',
  color: 'white',
  fontSize: '0.95rem'
};

export default Login;