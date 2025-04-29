# What Beats Rock Game

What Beats Rock is a creative twist on the classic Rock-Paper-Scissors game. It allows players to add new items and dynamically determine their relationships using AI-powered predictions.

## Features

- **Dynamic Gameplay**: Add new items to the game and let AI determine their relationships.
- **AI Integration**: Uses the Groq API to predict relationships between items.
- **Interactive UI**: Built with React and styled for a modern, responsive experience.
- **Custom Rules Display**: View the relationships between all items in a clear table format.
- **Score Tracking**: Keep track of player and computer scores.

## Tech Stack

- **Frontend**: React with Vite for fast development and HMR.
- **Styling**: CSS for responsive and modern design.
- **AI Integration**: Groq API for relationship predictions.
- **Build Tool**: Vite for optimized builds and development.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Groq API key (optional for full functionality)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/what-beats-rock.git
   cd what-beats-rock



  2. Install dependencies:
     npm install

  3. Create a .env file in the root directory and add your Groq API key (optional):
       VITE_GROQ_API_KEY=your-api-key

  4. Start the development server:
     npm run dev

5. Open the app in your browser at http://localhost:5173.

Building for Production
To build the app for production, run:

npm run build

The production-ready files will be in the dist directory.

Usage
Select an item to play against the computer.
Add new items using the input field, and let AI determine their relationships.
View the rules and relationships in the "Game Rules" section.
Track your score in the scoreboard.

Project Structure

what-beats-rock/
├── public/               # Static assets
├── src/                  # Source code
│   ├── components/       # React components
│   ├── services/         # API and utility services
│   ├──            # Main app component
│   ├──           # Entry point
│   └──          # Global styles
├── .env                  # Environment variables
├──           # Project configuration
├──         # Vite configuration
└──              # Project documentation

Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgments
React
Vite
Groq API


This README provides a comprehensive overview of the project, including setup instructions, usage, and technical details. You can customize it further based on your specific needs.
