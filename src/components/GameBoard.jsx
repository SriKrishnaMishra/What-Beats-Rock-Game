import React from 'react';

function GameBoard({ items, onSelectItem, playerChoice, computerChoice, result }) {
  return (
    <div className="game-board">
      <div className="items-container">
        {items.map((item) => (
          <button
            key={item}
            className={`item-button ${item === playerChoice ? 'selected' : ''}`}
            onClick={() => onSelectItem(item)}
          >
            {item}
          </button>
        ))}
      </div>
      
      {result && (
        <div className="result-display">
          <p>You chose: <strong>{playerChoice}</strong></p>
          <p>Computer chose: <strong>{computerChoice}</strong></p>
          <p><strong>{result}</strong></p>
        </div>
      )}
    </div>
  );
}

export default GameBoard;