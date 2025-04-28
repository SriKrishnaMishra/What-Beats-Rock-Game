import React from 'react';

function RulesDisplay({ rules, items }) {
  return (
    <div className="rules-display">
      <h2>Game Rules</h2>
      
      <table className="rules-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Beats</th>
            <th>Loses To</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => {
            // Find all items this item beats
            const beats = items.filter(opponent => 
              opponent !== item && rules[item] && rules[item][opponent] === true
            );
            
            // Find all items this item loses to
            const losesTo = items.filter(opponent => 
              opponent !== item && rules[opponent] && rules[opponent][item] === true
            );
            
            return (
              <tr key={item}>
                <td><strong>{item}</strong></td>
                <td className="rules-win">
                  {beats.length > 0 ? beats.join(', ') : 'None'}
                </td>
                <td className="rules-lose">
                  {losesTo.length > 0 ? losesTo.join(', ') : 'None'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RulesDisplay;