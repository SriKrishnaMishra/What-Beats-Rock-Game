// API key from environment
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export const predictRelationship = async (itemA, itemB) => {
  try {
    console.log(`Predicting relationship between ${itemA} and ${itemB} using Groq`);
    
    // For development without an API key, use a mock implementation
    if (!GROQ_API_KEY) {
      console.warn("Using mock predictions because no Groq API key is provided");
      // Mock implementation for testing without an API key
      if (Math.random() > 0.3) {
        // Standard rock-paper-scissors rules
        if (itemA === "Rock" && itemB === "Scissors") return true;
        if (itemA === "Scissors" && itemB === "Paper") return true;
        if (itemA === "Paper" && itemB === "Rock") return true;
        
        // For new items, use character code comparison as a deterministic fallback
        const itemAValue = itemA.charCodeAt(0);
        const itemBValue = itemB.charCodeAt(0);
        return itemAValue > itemBValue;
      } else {
        // Some randomness for variety
        return Math.random() > 0.5;
      }
    }
    
    // Actual Groq API implementation using fetch
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // Using Llama 3 70B model
        messages: [
          {
            role: "system",
            content: "You are determining logical relationships for a game like Rock-Paper-Scissors. Respond with only 'true' or 'false'."
          },
          {
            role: "user",
            content: `In a game like Rock-Paper-Scissors with creative relationships, would ${itemA} logically beat ${itemB}? Consider physical properties, cultural associations, and imaginative scenarios. Answer with only 'true' or 'false'.`
          }
        ],
        max_tokens: 10,
        temperature: 0.2
      })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    const answer = data.choices[0].message.content.toLowerCase().trim();
    console.log(`Groq response for ${itemA} vs ${itemB}: ${answer}`);
    return answer.includes('true');
    
  } catch (error) {
    console.error("Error predicting relationship with Groq:", error);
    // Default relationship if API fails
    return Math.random() > 0.5;
  }
};