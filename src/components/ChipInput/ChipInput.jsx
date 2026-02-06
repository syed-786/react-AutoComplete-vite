import React, { useState, useEffect } from 'react';

export default function ChipInput() {
  const [inputValue, setInputValue] = useState('');
  const [chips, setChips] = useState([]);

  const handleInputChange = e => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setChips(prev => [...prev, inputValue]);
      setInputValue('');
    }
  };

  const deleteChip = id => {
    const res = chips.filter((_, index) => index != id);
    setChips(res);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ marginBottom: '20px' }}>Chips Input</div>
      <div>
        {' '}
        <input
          type="text"
          placeholder="Chip Input"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => handleInputChange(e)}
        />
      </div>
      <div style={{ display: 'flex' }}>
        {chips?.map((item, index) => {
          return (
            <div
              key={index}
              style={{
                background: 'grey',
                borderRadius: '5px',
                padding: '5px 8px',
                margin: '5px',
                width: 'fit-content',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
              <button onClick={() => deleteChip(index)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
