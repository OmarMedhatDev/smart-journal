import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import Toast from '../components/Toast';

const CreateNote = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [validationError, setValidationError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); 

const handleSubmit = async () => {
    setValidationError('');
    
    if (!title.trim() || !content.trim()) {
      setValidationError('Please add a title and content');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post('http://127.0.0.1:8000/notes/', {
        title: title,
        content: content
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setToastMessage('Note saved successfully! Redirecting...');
      setToastType('success');
      setShowToast(true);
      setTimeout(() => navigate('/view'), 2000);
      
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        setToastMessage('Session expired. Please login again.');
        setToastType('error');
        setShowToast(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setToastMessage('Failed to save note. Please try again.');
        setToastType('error');
        setShowToast(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {loading && (
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
        zIndex: 9998,
        backdropFilter: 'blur(2px)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <Loader size={48} style={{ animation: 'spin 1s linear infinite', color: '#A3E635' }} />
          <p style={{ color: '#A0A0A0', fontSize: '1.1rem', fontWeight: '500' }}>Creating your note...</p>
        </div>
      </div>
    )}
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      <div className="card" style={{ padding: '40px', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
        
        <h2 style={{ marginBottom: '30px' }}>Express Your Thoughts</h2>

        {validationError && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #ef4444',
            color: '#ef4444',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '0.95rem'
          }}>
            {validationError}
          </div>
        )}
        <input 
          type="text"
          placeholder="Give it a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: '1px solid #333',
            color: 'white',
            fontSize: '1.2rem',
            marginBottom: '20px',
            outline: 'none'
          }}
        />

        {/* Content Textarea */}
        <textarea 
          placeholder="Start writing your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: '#A0A0A0',
            fontSize: '1rem',
            resize: 'none',
            outline: 'none',
            fontFamily: 'Inter'
          }}
        />

        {/* Submit Button */}
        <div style={{ marginTop: 'auto' }}>
          <button
            className="btn-primary" 
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <><Loader size={18} style={{ animation: 'spin 1s linear infinite' }} /> Analyzing...</> : 'Submit Your Note'}
          </button>
        </div>
        </div>

      </div>
      {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setShowToast(false)} 
        />
      )}
    </>
  );
};

export default CreateNote;