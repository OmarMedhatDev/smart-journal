import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast from '../components/Toast';

const ViewNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/notes/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedNoteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/notes/${selectedNoteId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotes(notes.filter(note => note.id !== selectedNoteId));
      setToastMessage('Note deleted successfully');
      setToastType('success');
    } catch (error) {
      console.error('Error deleting note:', error);
      setToastMessage('Failed to delete note');
      setToastType('error');
    } finally {
      setShowConfirm(false);
      setSelectedNoteId(null);
    }
  };

  const getMoodColor = (mood) => {
    const moodColors = {
      'Happy': '#22c55e',
      'Sad': '#ef4444',
      'Neutral': '#a0a0a0',
      'Anxious': '#f59e0b',
      'Confident': '#3b82f6'
    };
    return moodColors[mood] || '#a0a0a0';
  };

  if (loading) {
    return (
      <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: '#A0A0A0' }}>Loading your notes...</p>
      </div>
    );
  }

  return (
    <>
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>Your Notes</h1>

      {notes.length === 0 ? (
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: '#A0A0A0', fontSize: '1.1rem' }}>
            No notes yet. <a href="/create" style={{ color: '#D8B4FE', textDecoration: 'none' }}>Create your first note</a>
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {notes.map((note) => (
            <div key={note.id} className="card" style={{ padding: '25px', borderLeft: `5px solid ${getMoodColor(note.mood)}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '5px', margin: 0 }}>{note.title}</h3>
                  <p style={{ color: '#A0A0A0', fontSize: '0.85rem', marginBottom: '10px' }}>
                    {new Date(note.created_at).toLocaleDateString()}
                  </p>
                  <p style={{ color: '#C0C0C0', lineHeight: '1.6' }}>
                    {note.content.substring(0, 150)}...
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: '20px' }}>
                  <div style={{
                    background: getMoodColor(note.mood),
                    color: '#1a1a1a',
                    padding: '8px 15px',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {note.mood || 'Neutral'}
                  </div>
                  <button
                    onClick={() => handleDeleteClick(note.id)}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid #ef4444',
                      color: '#ef4444',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    {showConfirm && (
      <ConfirmDialog
        title="Delete Note?"
        message="This action cannot be undone. Are you sure you want to delete this note?"
        confirmText="Delete"
        cancelText="Cancel"
        isDangerous={true}
        onConfirm={confirmDelete}
        onCancel={() => {
          setShowConfirm(false);
          setSelectedNoteId(null);
        }}
      />
    )}
    {toastMessage && (
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage('')}
      />
    )}
    </>
  );
};

export default ViewNotes;
