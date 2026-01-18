import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, BarChart3, TrendingUp, Sparkles } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <div style={{ marginBottom: '60px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #D8B4FE 0%, #A3E635 100%)',
            padding: '20px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <PenTool size={40} color="#121212" />
          </div>
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>Welcome to MoodNotes</h1>
        <p style={{ fontSize: '1.2rem', color: '#A0A0A0', maxWidth: '600px', margin: '0 auto' }}>
          Track your emotions, create meaningful notes, and understand your mood patterns over time
        </p>
      </div>

      {/* Quick Action Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '60px' }}>
        {/* Create Note Card */}
        <Link to="/create" style={{ textDecoration: 'none' }}>
          <div className="card" style={{
            padding: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            height: '100%',
            border: '2px solid transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#D8B4FE';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            <div style={{
              background: 'rgba(216, 180, 254, 0.1)',
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '15px'
            }}>
              <PenTool size={28} color="#D8B4FE" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Create Note</h3>
            <p style={{ color: '#A0A0A0', fontSize: '0.95rem' }}>
              Express your thoughts and let AI detect your mood
            </p>
          </div>
        </Link>

        {/* View Notes Card */}
        <Link to="/view" style={{ textDecoration: 'none' }}>
          <div className="card" style={{
            padding: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            height: '100%',
            border: '2px solid transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#A3E635';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            <div style={{
              background: 'rgba(163, 230, 53, 0.1)',
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '15px'
            }}>
              <BarChart3 size={28} color="#A3E635" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>View Notes</h3>
            <p style={{ color: '#A0A0A0', fontSize: '0.95rem' }}>
              Browse and manage all your mood notes
            </p>
          </div>
        </Link>

        {/* Mood Analysis Card */}
        <Link to="/analysis" style={{ textDecoration: 'none' }}>
          <div className="card" style={{
            padding: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s',
            height: '100%',
            border: '2px solid transparent'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '15px'
            }}>
              <TrendingUp size={28} color="#3b82f6" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Mood Analysis</h3>
            <p style={{ color: '#A0A0A0', fontSize: '0.95rem' }}>
              Analyze your mood patterns and trends
            </p>
          </div>
        </Link>
      </div>

      {/* Features Section */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '40px', textAlign: 'center' }}>Why Use MoodNotes?</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {[
            {
              icon: <Sparkles size={32} />,
              title: 'AI-Powered Analysis',
              description: 'Our AI automatically detects your mood from your notes'
            },
            {
              icon: <TrendingUp size={32} />,
              title: 'Track Trends',
              description: 'Understand your emotional patterns and how they evolve'
            },
            {
              icon: <BarChart3 size={32} />,
              title: 'Beautiful Insights',
              description: 'Visualize your mood data with elegant charts'
            }
          ].map((feature, i) => (
            <div key={i} style={{
              background: 'rgba(216, 180, 254, 0.05)',
              border: '1px solid #3f3f46',
              borderRadius: '12px',
              padding: '30px',
              textAlign: 'center'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '15px',
                color: '#D8B4FE'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ marginBottom: '10px', fontSize: '1.1rem' }}>{feature.title}</h3>
              <p style={{ color: '#A0A0A0', fontSize: '0.95rem' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(216, 180, 254, 0.1) 0%, rgba(163, 230, 53, 0.05) 100%)',
        border: '1px solid #3f3f46',
        borderRadius: '12px',
        padding: '50px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '15px' }}>Ready to start journaling?</h2>
        <p style={{ color: '#A0A0A0', marginBottom: '30px', fontSize: '1.05rem' }}>
          Your first note is just a click away. Begin your mood tracking journey today!
        </p>
        <Link to="/create" style={{ textDecoration: 'none' }}>
          <button className="btn-primary" style={{
            fontSize: '1.1rem',
            padding: '14px 40px',
            fontWeight: '600'
          }}>
            Create Your First Note
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;