import { create } from 'zustand';
import { GameState, Position, Snake, Direction } from '../types/game';
import { generateRandomPosition, checkCollision } from '../utils/gameUtils';

interface GameStore extends GameState {
  initializeGame: (players: string[]) => void;
  moveSnake: (id: string, direction: Direction) => void;
  updateGame: () => void;
  resetGame: () => void;
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'];
const INITIAL_LENGTH = 3;
const GRID_SIZE = 20;

export const useGameStore = create<GameStore>((set, get) => ({
  snakes: [],
  food: { x: 0, y: 0 },
  isGameOver: false,
  winner: null,
  gridSize: GRID_SIZE,

  initializeGame: (players) => {
    const snakes = players.map((name, index) => ({
      id: `player-${index}`,
      positions: Array.from({ length: INITIAL_LENGTH }, (_, i) => ({
        x: GRID_SIZE / 2,
        y: GRID_SIZE / 2 + i
      })),
      direction: 'UP' as Direction,
      color: COLORS[index],
      score: 0,
      name,
      isAlive: true
    }));

    set({
      snakes,
      food: generateRandomPosition(GRID_SIZE, snakes.map(s => s.positions).flat()),
      isGameOver: false,
      winner: null
    });
  },

  moveSnake: (id, direction) => {
    set((state) => ({
      snakes: state.snakes.map((snake) =>
        snake.id === id ? { ...snake, direction } : snake
      )
    }));
  },

  updateGame: () => {
    const state = get();
    if (state.isGameOver) return;

    const newSnakes = state.snakes.map((snake) => {
      if (!snake.isAlive) return snake;

      const head = { ...snake.positions[0] };
      switch (snake.direction) {
        case 'UP':
          head.y--;
          break;
        case 'DOWN':
          head.y++;
          break;
        case 'LEFT':
          head.x--;
          break;
        case 'RIGHT':
          head.x++;
          break;
      }

      // Check wall collision
      if (
        head.x < 0 ||
        head.x >= GRID_SIZE ||
        head.y < 0 ||
        head.y >= GRID_SIZE
      ) {
        return { ...snake, isAlive: false };
      }

      const newPositions = [head, ...snake.positions];
      
      // Check food collision
      if (head.x === state.food.x && head.y === state.food.y) {
        snake.score += 10;
      } else {
        newPositions.pop();
      }

      return { ...snake, positions: newPositions };
    });

    // Check snake collisions
    newSnakes.forEach((snake) => {
      if (!snake.isAlive) return;

      const head = snake.positions[0];
      newSnakes.forEach((otherSnake) => {
        const collisionPositions = otherSnake.id === snake.id
          ? otherSnake.positions.slice(1)
          : otherSnake.positions;

        if (checkCollision(head, collisionPositions)) {
          snake.isAlive = false;
        }
      });
    });

    // Check if food was eaten
    const head = newSnakes.find(s => s.isAlive)?.positions[0];
    if (head && head.x === state.food.x && head.y === state.food.y) {
      const newFood = generateRandomPosition(
        GRID_SIZE,
        newSnakes.map(s => s.positions).flat()
      );
      set({ food: newFood });
    }

    // Check game over
    const aliveSnakes = newSnakes.filter(s => s.isAlive);
    if (aliveSnakes.length <= 1) {
      set({
        isGameOver: true,
        winner: aliveSnakes[0] || null,
        snakes: newSnakes
      });
    } else {
      set({ snakes: newSnakes });
    }
  },

  resetGame: () => {
    const players = get().snakes.map(s => s.name);
    get().initializeGame(players);
  }
}));