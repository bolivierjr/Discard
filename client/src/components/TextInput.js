import React from 'react';
import '../styles/TextInput.css';

const TextInput = () => {
  return (
    <div className="text-input">
      <input
        id="text-bar"
        type="text"
        placeholder="Message #channel"
        autoFocus
      />
    </div>
  );
};

export default TextInput;
