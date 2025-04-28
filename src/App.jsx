import { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import ItemInput from './components/ItemInput';
import RulesDisplay from './components/RulesDisplay';
import ScoreBoard from './components/ScoreBoard';
import { predictRelationship } from './services/llmService';

function App() {
  const [items, setItems] = useState(['Rock', 'Paper', 'Scissors']);
  const [rules, setRules] = useState({});
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize rules for Rock, Paper, Scissors
  useEffect(() => {
    const initialRules = {
      Rock: { Scissors: true, Paper: false },
      Paper: { Rock: true, Scissors: false },
      Scissors: { Paper: true, Rock: false }
    };
    setRules(initialRules);
  }, []);

  const addItem = async (newItem) => {
    if (items.includes(newItem)) {
      setError(`"${newItem}" is already in the game!`);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Create a copy of the current rules
      const updatedRules = { ...rules };
      
      // Initialize entry for the new item
      updatedRules[newItem] = {};
      
      // Determine relationships for existing items
      for (const existingItem of items) {
        // What happens when newItem faces existingItem
        const newBeatsExisting = await predictRelationship(newItem, existingItem);
        updatedRules[newItem][existingItem] = newBeatsExisting;
        
        // What happens when existingItem faces newItem
        const existingBeatsNew = await predictRelationship(existingItem, newItem);
        updatedRules[existingItem][newItem] = existingBeatsNew;
      }
      
      // Update states
      setRules(updatedRules);
      setItems([...items, newItem]);
    } catch (err) {
      console.error("Error adding new item:", err);
      setError("Failed to add new item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const playGame = (playerItem) => {
    // Player selects an item
    setPlayerChoice(playerItem);
    
    // Computer randomly selects an item
    const randomIndex = Math.floor(Math.random() * items.length);
    const computerItem = items[randomIndex];
    setComputerChoice(computerItem);
    
    // Determine the result
    let gameResult;
    if (playerItem === computerItem) {
      gameResult = "It's a tie!";
    } else {
      const playerWins = rules[playerItem][computerItem];
      
      if (playerWins) {
        gameResult = `You win! ${playerItem} beats ${computerItem}`;
        setScore({ ...score, player: score.player + 1 });
      } else {
        gameResult = `Computer wins! ${computerItem} beats ${playerItem}`;
        setScore({ ...score, computer: score.computer + 1 });
      }
    }
    
    setResult(gameResult);
  };

  return (
    <div className="app-container">
      <h1>What Beats Rock Game</h1>
      
      <div className="game-section">
        <ItemInput 
          addItem={addItem} 
          isLoading={isLoading} 
          error={error}
        />
        
        <ScoreBoard score={score} />
      </div>
      
      <GameBoard 
        items={items} 
        onSelectItem={playGame}
        playerChoice={playerChoice}
        computerChoice={computerChoice}
        result={result}
      />
      
      <RulesDisplay rules={rules} items={items} />
    </div>
  );
}

export default App;