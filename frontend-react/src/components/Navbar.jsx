import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Pencil } from 'lucide-react'; // Icon for the logo

const Navbar = () => {
  const location = useLocation();
  
  // Helper to highlight the active link
  const isActive = (path) => {
    const active = location.pathname === path;
    return { 
      color: active ? 'white' : '#A0A0A0',
      fontWeight: active ? 'bold' : 'normal',
      borderBottom: active ? '2px solid #A3E635' : '2px solid transparent',
      paddingBottom: '8px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    };
  };

  return (
    <nav style={{
      height: 'var(--nav-height)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      borderBottom: '1px solid #333'
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>
        <Pencil size={20} fill="white" />
        <span>MoodNotes</span>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '30px', fontSize: '0.9rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', ...isActive('/') }}>Home</Link>
        <Link to="/create" style={{ textDecoration: 'none', ...isActive('/create') }}>Create Note</Link>
        <Link to="/view" style={{ textDecoration: 'none', ...isActive('/view') }}>View Notes</Link>
        <Link to="/analysis" style={{ textDecoration: 'none', ...isActive('/analysis') }}>Mood Analysis</Link>
        <Link to="/settings" style={{ textDecoration: 'none', ...isActive('/settings') }}>Settings</Link>
      </div>
    </nav>
  );
};

export default Navbar;