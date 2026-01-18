import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const MoodAnalysis = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const getMoodStats = () => {
    const moodCount = {};
    notes.forEach(note => {
      const mood = note.mood || 'Neutral';
      moodCount[mood] = (moodCount[mood] || 0) + 1;
    });
    return Object.entries(moodCount).map(([mood, count]) => ({
      name: mood,
      value: count
    }));
  };

  const COLORS = ['#22c55e', '#ef4444', '#a0a0a0', '#f59e0b', '#3b82f6', '#D8B4FE'];

  if (loading) {
    return (
      <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: '#A0A0A0' }}>Loading mood analysis...</p>
      </div>
    );
  }

  const moodData = getMoodStats();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px', fontSize: '2rem' }}>Mood Analysis</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ color: '#A0A0A0', fontSize: '0.9rem', marginBottom: '10px' }}>Total Notes</p>
          <h2 style={{ fontSize: '2.5rem', margin: 0, color: '#D8B4FE' }}>{notes.length}</h2>
        </div>
        
        <div className="card" style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ color: '#A0A0A0', fontSize: '0.9rem', marginBottom: '10px' }}>Most Common Mood</p>
          <h2 style={{ fontSize: '2.5rem', margin: 0, color: '#22c55e' }}>
            {moodData.length > 0 ? moodData[0].name : 'N/A'}
          </h2>
        </div>
      </div>

      {moodData.length > 0 ? (
        <div className="card" style={{ padding: '30px', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ marginBottom: '20px' }}>Mood Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={moodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {moodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
          <p style={{ color: '#A0A0A0', fontSize: '1.1rem' }}>
            No mood data available. <a href="/create" style={{ color: '#D8B4FE', textDecoration: 'none' }}>Create your first note</a> to see analysis.
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodAnalysis;
