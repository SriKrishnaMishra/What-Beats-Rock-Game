import React from 'react';

function ScoreBoard({ score }) {
  return (
    <div className="score-board">
      <h2>Score</h2>
      <p>Player: {score.player} | Computer: {score.computer}</p>
    </div>
  );
}

export default ScoreBoard;