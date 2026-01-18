import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const EmojiPicker = ({ onSelect, selected = null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const moods = [
    { emoji: '😊', label: 'Happy', value: 'Happy' },
    { emoji: '😢', label: 'Sad', value: 'Sad' },
    { emoji: '😐', label: 'Neutral', value: 'Neutral' },
    { emoji: '😰', label: 'Anxious', value: 'Anxious' },
    { emoji: '😎', label: 'Confident', value: 'Confident' },
    { emoji: '😍', label: 'In love', value: 'In love' },
    { emoji: '😡', label: 'Angry', value: 'Angry' },
    { emoji: '😴', label: 'Tired', value: 'Tired' },
    { emoji: '🤔', label: 'Thoughtful', value: 'Thoughtful' },
    { emoji: '😲', label: 'Surprised', value: 'Surprised' },
  ];

  const selectedMood = moods.find(m => m.value === selected);

  return (
    <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: '#27272a',
          border: '1px solid #3f3f46',
          color: 'white',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: '500',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = '#D8B4FE';
          e.target.style.background = '#2A2A2F';
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = '#3f3f46';
          e.target.style.background = '#27272a';
        }}
      >
        <span>
          {selectedMood ? (
            <>
              <span style={{ marginRight: '8px', fontSize: '1.3rem' }}>{selectedMood.emoji}</span>
              {selectedMood.label}
            </>
          ) : (
            'How are you feeling?'
          )}
        </span>
        <ChevronDown
          size={20}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '8px',
            background: '#1E1E1E',
            border: '1px solid #3f3f46',
            borderRadius: '8px',
            padding: '12px',
            zIndex: 1000,
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '8px'
          }}
        >
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => {
                onSelect(mood.value);
                setIsOpen(false);
              }}
              title={mood.label}
              style={{
                fontSize: '2rem',
                background: selected === mood.value ? 'rgba(216, 180, 254, 0.2)' : 'transparent',
                border: selected === mood.value ? '2px solid #D8B4FE' : '1px solid #3f3f46',
                borderRadius: '8px',
                padding: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50px'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(216, 180, 254, 0.1)';
                e.target.style.borderColor = '#D8B4FE';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = selected === mood.value ? 'rgba(216, 180, 254, 0.2)' : 'transparent';
                e.target.style.borderColor = selected === mood.value ? '#D8B4FE' : '#3f3f46';
              }}
            >
              {mood.emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
