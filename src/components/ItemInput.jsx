import React, { useState } from 'react';

function ItemInput({ addItem, isLoading, error }) {
  const [newItem, setNewItem] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem.trim() !== '') {
      addItem(newItem.trim());
      setNewItem('');
    }
  };
  
  return (
    <div className="item-input-container">
      <form onSubmit={handleSubmit} className="item-input">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || newItem.trim() === ''}>
          Add
        </button>
      </form>
      
      {isLoading && (
        <div className="loading-indicator">
          Determining relationships with AI...
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}

export default ItemInput;