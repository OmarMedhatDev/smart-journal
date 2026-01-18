import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Loader } from 'lucide-react';
import Toast from '../components/Toast';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://127.0.0.1:8000/users/', {
        email: email,
        username: username,
        password: password
      });
      setToastMessage('Account created successfully! Redirecting to login...');
      setShowToast(true);
      setTimeout(() => navigate('/login'), 2000);
      
    } catch (err) {
      console.error("Registration Error:", err);
      
      if (err.response && err.response.data && err.response.data.detail) {
        const detail = err.response.data.detail;
        
        if (typeof detail === 'string') {
          setError(detail);
        } 
        else if (Array.isArray(detail)) {
          setError(detail[0].msg || "Invalid data provided");
        }
        else {
          setError(JSON.stringify(detail));
        }
      } else {
        setError('Registration failed. Is the server running?');
      }
      setLoading(false);
    }
  };

  return (
    <>
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #121212 0%, #1a1a1a 100%)' }}>
      <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />
      {/* Site Title Header */}
      <div style={{ position: 'absolute', top: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0', color: '#D8B4FE' }}>MoodNotes</h1>
        <p style={{ color: '#A0A0A0', margin: '5px 0 0 0', fontSize: '0.95rem' }}>Track your mood, one note at a time</p>
      </div>

      <div className="card" style={{ width: '400px', textAlign: 'center', padding: '40px', marginTop: '40px', maxWidth: 'calc(100% - 40px)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(216, 180, 254, 0.1)', padding: '15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserPlus size={32} color="#D8B4FE" />
          </div>
        </div>

        <h2 style={{ marginBottom: '10px', fontSize: '1.5rem', fontWeight: 'bold' }}>Create Account</h2>
        <p style={{ color: '#A0A0A0', marginBottom: '30px', fontSize: '0.95rem' }}>Join MoodNotes today</p>

        {error && <div style={{ color: '#ef4444', marginBottom: '15px', fontSize: '0.9rem', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '5px' }}>{error}</div>}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <input 
            type="text" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={inputStyle}
            required
          />
          
          <button 
            type="submit" 
            className="btn-primary" 
            style={{ marginTop: '10px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            disabled={loading}
          >
            {loading ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Signing up...</> : 'Sign Up'}
          </button>
        </form>

        <div style={{ marginTop: '25px', fontSize: '0.9rem', color: '#9CA3AF' }}>
          Already have an account? <Link to="/login" style={{ color: 'white', fontWeight: 'bold', textDecoration: 'underline' }}>Log In</Link>
        </div>

      </div>
    </div>
  </>
  );
};

const inputStyle = {
  padding: '14px',
  background: '#27272a',
  border: '1px solid #3f3f46',
  borderRadius: '8px',
  color: 'white',
  fontSize: '0.95rem'
};

export default Register;