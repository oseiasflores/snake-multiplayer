import { Position } from '../types/game';

export function generateRandomPosition(gridSize: number, occupied: Position[]): Position {
  let position: Position;
  do {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    };
  } while (checkCollision(position, occupied));
  return position;
}

export function checkCollision(position: Position, positions: Position[]): boolean {
  return positions.some(p => p.x === position.x && p.y === position.y);
}