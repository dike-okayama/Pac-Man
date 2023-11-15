import Queue from "queue-fifo";

import { Board } from "@/app/_types/board";

export abstract class BaseGhost {
  abstract posX: number;
  abstract posY: number;
  // abstract direction: number;
  abstract color: string;

  abstract move(
    board: Board,
    pacmanPos: { posX: number; posY: number },
    frame: number
  ): void;
}

/**
 * Blinky is the red ghost who likes to chase Pacman.
 */
export class ShadowBlinky extends BaseGhost {
  posX: number;
  posY: number;
  color = "red";

  constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
  }

  move(
    board: Board,
    pacmanPos: { posX: number; posY: number; frame: number },
    frame: number
  ): void {
    if (this.posX == pacmanPos.posX && this.posY == pacmanPos.posY) return;

    let tx: number;
    let ty: number;

    if (frame % (60 * 40) < 60 * 20) {
      // move to territory
      const minY = 1;
      const maxY = Math.round(board.length / 2);
      const minX = Math.round((board[0].length * 2) / 3);
      const maxX = board[0].length - 2;

      const options: { x: number; y: number }[] = [];
      for (let y = minY; y < maxY; y++) {
        for (let x = minX; x < maxX; x++) {
          if (board[y][x] === "Wall") continue;
          options.push({ x, y });
        }
      }

      const t = options[Math.floor(Math.random() * options.length)];
      tx = t.x;
      ty = t.y;
    } else {
      // move to pacman
      tx = pacmanPos.posX;
      ty = pacmanPos.posY;
    }

    const { x, y } = nextPos(
      board,
      { x: this.posX, y: this.posY },
      { x: tx, y: ty }
    );
    this.posX = x;
    this.posY = y;
  }
}

/**
 * Pinky is the pink ghost who likes to ambush Pacman.
 */
export class SpeedyPinky extends BaseGhost {
  posX: number;
  posY: number;
  prePacmanPosX: number;
  prePacmanPosY: number;
  color = "pink";

  constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
    this.prePacmanPosX = 10;
    this.prePacmanPosY = 10;
  }

  move(board: Board, pacmanPos: { posX: number; posY: number }, frame: number) {
    if (this.posX == pacmanPos.posX && this.posY == pacmanPos.posY) return;

    let tx: number;
    let ty: number;

    if (60 * 20 < frame % (60 * 40) && frame % (60 * 40) < 60 * 40) {
      // move to territory
      const minY = 1;
      const maxY = Math.round(board.length / 2);
      const minX = 1;
      const maxX = Math.round(board[0].length / 3);

      const options: { x: number; y: number }[] = [];
      for (let y = minY; y < maxY; y++) {
        for (let x = minX; x < maxX; x++) {
          if (board[y][x] === "Wall") continue;
          options.push({ x, y });
        }
      }

      const t = options[Math.floor(Math.random() * options.length)];
      tx = t.x;
      ty = t.y;
    } else {
      const dx = pacmanPos.posX - this.prePacmanPosX;
      const dy = pacmanPos.posY - this.prePacmanPosY;

      tx = pacmanPos.posX + dx * 4;
      ty = pacmanPos.posY + dy * 4;

      if (tx < 1) tx = 1;
      if (tx >= board[0].length - 1) tx = board[0].length - 2;
      if (ty < 1) ty = 1;
      if (ty >= board.length - 1) ty = board.length - 2;

      if (board[ty][tx] === "Wall") {
        tx = pacmanPos.posX;
        ty = pacmanPos.posY;
      }
    }

    const { x, y } = nextPos(
      board,
      { x: this.posX, y: this.posY },
      { x: tx, y: ty }
    );

    this.posX = x;
    this.posY = y;

    this.prePacmanPosX = pacmanPos.posX;
    this.prePacmanPosY = pacmanPos.posY;
  }
}

/**
 * Inky is the cyan ghost who likes to be unpredictable.
 */
export class BashfulInky extends BaseGhost {
  posX: number;
  posY: number;
  color = "cyan";

  constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
  }

  move() {
    // TODO: implement
  }
}

/**
 * Clyde is the orange ghost who likes to take his time.
 */
export class PokeyClyde extends BaseGhost {
  posX: number;
  posY: number;
  color = "orange";

  constructor(posX: number, posY: number) {
    super();
    this.posX = posX;
    this.posY = posY;
  }

  move(board: Board, pacmanPos: { posX: number; posY: number }, frame: number) {
    if (this.posX == pacmanPos.posX && this.posY == pacmanPos.posY) return;

    let tx: number;
    let ty: number;

    if (60 * 10 < frame % (60 * 40) && frame % (60 * 40) < 60 * 30) {
      // move to territory
      const minY = Math.round(board.length / 2);
      const maxY = board.length - 2;
      const minX = 1;
      const maxX = Math.round(board[0].length / 3);

      const options: { x: number; y: number }[] = [];
      for (let y = minY; y < maxY; y++) {
        for (let x = minX; x < maxX; x++) {
          if (board[y][x] === "Wall") continue;
          options.push({ x, y });
        }
      }

      const t = options[Math.floor(Math.random() * options.length)];
      tx = t.x;
      ty = t.y;
    } else {
      if (
        Math.sqrt(
          (pacmanPos.posX - this.posX) ** 2 + (pacmanPos.posY - this.posY) ** 2
        ) < 5
      ) {
        tx = 1;
        ty = 1;
      } else {
        tx = pacmanPos.posX;
        ty = pacmanPos.posY;
      }
    }
    const { x, y } = nextPos(
      board,
      { x: this.posX, y: this.posY },
      { x: tx, y: ty }
    );

    this.posX = x;
    this.posY = y;
  }
}

/**
 * Return the next position of the ghost heading to the target using BFS
 */
const nextPos = (
  board: Board,
  currentPos: { x: number; y: number },
  targetPos: { x: number; y: number }
): { x: number; y: number } => {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const toKey = (x: number, y: number) => `${x},${y}`;
  const toPos = (key: string) => {
    const [x, y] = key.split(",");
    return { x: Number(x), y: Number(y) };
  };

  const que = new Queue<{ ux: number; uy: number }>();
  que.enqueue({ ux: currentPos.x, uy: currentPos.y });

  const visited = new Set<string>();

  // from[u] := previous node in shortest path
  const from = new Map<string, string>();

  while (true) {
    if (que.isEmpty()) break;
    const { ux, uy } = que.dequeue()!;
    const uKey = toKey(ux, uy);
    visited.add(uKey);

    for (let i = 0; i < 4; i++) {
      const vx = ux + dx[i];
      const vy = uy + dy[i];
      const vKey = toKey(vx, vy);

      if (visited.has(vKey)) continue;
      if (vx < 0 || vx >= board[0].length) continue;
      if (vy < 0 || vy >= board.length) continue;
      if (board[vy][vx] === "Wall") continue;

      que.enqueue({ ux: vx, uy: vy });
      from.set(vKey, uKey);
    }
  }

  let tx = targetPos.x;
  let ty = targetPos.y;

  let key = toKey(tx, ty);
  let nextKey: string | undefined;
  while ((nextKey = from.get(key))) {
    if (nextKey === toKey(currentPos.x, currentPos.y)) break;
    const { x, y } = toPos(nextKey);
    tx = x;
    ty = y;
    key = nextKey;
  }

  return { x: tx, y: ty };
};
