import React, { useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { Scoreboard } from './components/Scoreboard';
import { useGameStore } from './store/gameStore';
import { Gamepad2 } from 'lucide-react';

function App() {
  const { initializeGame, resetGame, isGameOver } = useGameStore();

  useEffect(() => {
    initializeGame(['Player 1', 'Player 2']);
  }, [initializeGame]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
            <Gamepad2 className="w-10 h-10" />
            Multiplayer Snake
          </h1>
          <p className="text-gray-600 mt-2">
            Player 1: Arrow Keys | Player 2: WASD
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <GameBoard />
            {isGameOver && (
              <button
                onClick={resetGame}
                className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Play Again
              </button>
            )}
          </div>
          <div>
            <Scoreboard />
            <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-2">How to Play</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Use arrow keys (Player 1) or WASD (Player 2) to move</li>
                <li>Collect food to grow and earn points</li>
                <li>Avoid walls and other snakes</li>
                <li>Last snake alive wins!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;