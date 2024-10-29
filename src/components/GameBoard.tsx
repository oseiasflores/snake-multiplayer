import React, { useEffect, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { Direction } from '../types/game';
import { Trophy } from 'lucide-react';

const CELL_SIZE = 25;

export function GameBoard() {
  const { snakes, food, gridSize, isGameOver, winner, moveSnake, updateGame } = useGameStore();

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const keyDirections: { [key: string]: { direction: Direction; playerId: string } } = {
      ArrowUp: { direction: 'UP', playerId: 'player-0' },
      ArrowDown: { direction: 'DOWN', playerId: 'player-0' },
      ArrowLeft: { direction: 'LEFT', playerId: 'player-0' },
      ArrowRight: { direction: 'RIGHT', playerId: 'player-0' },
      w: { direction: 'UP', playerId: 'player-1' },
      s: { direction: 'DOWN', playerId: 'player-1' },
      a: { direction: 'LEFT', playerId: 'player-1' },
      d: { direction: 'RIGHT', playerId: 'player-1' }
    };

    const movement = keyDirections[event.key.toLowerCase()];
    if (movement) {
      moveSnake(movement.playerId, movement.direction);
    }
  }, [moveSnake]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!isGameOver) {
      const gameLoop = setInterval(updateGame, 150);
      return () => clearInterval(gameLoop);
    }
  }, [isGameOver, updateGame]);

  return (
    <div className="relative">
      <div
        className="grid bg-gray-100 border-2 border-gray-300 rounded-lg overflow-hidden"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, ${CELL_SIZE}px)`,
          gap: '1px',
        }}
      >
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const isFood = food.x === x && food.y === y;
          const snake = snakes.find(s =>
            s.positions.some(p => p.x === x && p.y === y)
          );

          return (
            <div
              key={index}
              className={`w-${CELL_SIZE} h-${CELL_SIZE} ${
                isFood
                  ? 'bg-yellow-400 rounded-full'
                  : snake
                  ? ''
                  : 'bg-white'
              }`}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: snake ? snake.color : undefined,
              }}
            />
          );
        })}
      </div>

      {isGameOver && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
          <div className="bg-white p-6 rounded-lg shadow-xl text-center">
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Game Over!</h2>
            {winner ? (
              <p className="text-lg">
                Winner: <span style={{ color: winner.color }}>{winner.name}</span>
                <br />
                Score: {winner.score}
              </p>
            ) : (
              <p className="text-lg">It's a tie!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}