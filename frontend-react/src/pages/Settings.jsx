import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Lock } from 'lucide-react';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const Settings = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  useEffect(() => {
    // Try to get email from decoded token or localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setUserEmail(decoded.sub || '');
      } catch (e) {
        setUserEmail('');
      }
    }
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    setShowLogoutConfirm(false);
    setToastMessage('Logged out successfully');
    setToastType('success');
    setTimeout(() => navigate('/login'), 1500);
  };

  const handlePasswordChange = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setToastMessage('Please fill in all password fields');
      setToastType('error');
      return;
    }
    if (newPassword !== confirmPassword) {
      setToastMessage('New passwords do not match');
      setToastType('error');
      return;
    }
    setToastMessage('Password change feature coming soon');
    setToastType('success');
    setShowPasswordChange(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>Settings</h1>

      {/* Account Section */}
      <div className="card" style={{ padding: '30px', marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.3rem' }}>Account Settings</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: '#A0A0A0', fontSize: '0.9rem' }}>
            Email Address
          </label>
          <input 
            type="email" 
            value={userEmail || 'Loading...'}
            disabled
            style={{
              width: '100%',
              padding: '12px',
              background: '#27272a',
              border: '1px solid #3f3f46',
              borderRadius: '8px',
              color: userEmail ? 'white' : '#A0A0A0',
              boxSizing: 'border-box'
            }}
          />
        </div>

        <button
          onClick={() => setShowPasswordChange(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid #3b82f6',
            color: '#3b82f6',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.2)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.1)'}
        >
          <Lock size={18} />
          Change Password
        </button>
      </div>

      {/* Preferences Section */}
      <div className="card" style={{ padding: '30px', marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.3rem' }}>Preferences</h2>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked />
            <span>Enable email notifications for mood insights</span>
          </label>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked />
            <span>Allow data collection for AI improvements</span>
          </label>
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
            <input type="checkbox" />
            <span>Dark mode (always on)</span>
          </label>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card" style={{ padding: '30px', borderLeft: '5px solid #ef4444' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '1.3rem', color: '#ef4444' }}>Danger Zone</h2>
        
        <button
          onClick={handleLogoutClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.95rem',
            fontWeight: '500',
            width: '100%',
            justifyContent: 'center',
            marginBottom: '15px',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.2)'}
          onMouseLeave={(e) => e.target.style.background = 'rgba(239, 68, 68, 0.1)'}
        >
          <LogOut size={18} />
          Logout
        </button>

        <p style={{ color: '#A0A0A0', fontSize: '0.85rem', margin: '15px 0 0 0' }}>
          You'll be logged out of your account and need to login again to continue.
        </p>
      </div>

      {/* Change Password Modal */}
      {showPasswordChange && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}>
          <div style={{
            background: '#1E1E1E',
            borderRadius: '12px',
            padding: '30px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
          }}>
            <h2 style={{ marginBottom: '20px' }}>Change Password</h2>
            
            <input
              type="password"
              placeholder="Current Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#27272a',
                border: '1px solid #3f3f46',
                borderRadius: '8px',
                color: 'white',
                marginBottom: '12px',
                boxSizing: 'border-box'
              }}
            />

            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#27272a',
                border: '1px solid #3f3f46',
                borderRadius: '8px',
                color: 'white',
                marginBottom: '12px',
                boxSizing: 'border-box'
              }}
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                background: '#27272a',
                border: '1px solid #3f3f46',
                borderRadius: '8px',
                color: 'white',
                marginBottom: '20px',
                boxSizing: 'border-box'
              }}
            />

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowPasswordChange(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#27272a',
                  border: '1px solid #3f3f46',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#3b82f6',
                  border: 'none',
                  color: 'white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <ConfirmDialog
          title="Logout?"
          message="Are you sure you want to logout? You'll need to login again to continue."
          confirmText="Logout"
          cancelText="Cancel"
          isDangerous={true}
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage('')}
        />
      )}
    </div>
  );
};

export default Settings;
