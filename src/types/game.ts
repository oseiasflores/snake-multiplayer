export interface Position {
  x: number;
  y: number;
}

export interface Snake {
  id: string;
  positions: Position[];
  direction: Direction;
  color: string;
  score: number;
  name: string;
  isAlive: boolean;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface GameState {
  snakes: Snake[];
  food: Position;
  isGameOver: boolean;
  winner: Snake | null;
  gridSize: number;
}