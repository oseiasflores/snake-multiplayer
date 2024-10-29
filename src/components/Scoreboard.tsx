import React from 'react';
import { useGameStore } from '../store/gameStore';

export function Scoreboard() {
  const { snakes } = useGameStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Scoreboard</h2>
      <div className="space-y-2">
        {snakes.map((snake) => (
          <div
            key={snake.id}
            className="flex items-center justify-between p-2 rounded"
            style={{ backgroundColor: `${snake.color}20` }}
          >
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: snake.color }}
              />
              <span className="font-medium">{snake.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                Score: {snake.score}
              </span>
              <span className={`text-sm ${snake.isAlive ? 'text-green-600' : 'text-red-600'}`}>
                {snake.isAlive ? 'Alive' : 'Dead'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}