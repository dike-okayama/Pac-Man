import Pacman from "./pacman";
import {
  BaseGhost,
  ShadowBlinky,
  BashfulInky,
  SpeedyPinky,
  PokeyClyde,
} from "./ghost";
import boardData from "./board-data.json";

import type { Board } from "@/app/_types/board";
import { Direction } from "@/app/_types/pacman";

const CELL_SIZE = 30;
const BOARD_HEIGHT = boardData.length;
const BOARD_WIDTH = boardData[0].length;

const toRad = (deg: number) => (deg * Math.PI) / 180;

// `initialBoard` manages the wall and food, not managing pacman and ghosts because they are moving.
const initialBoard: Board = boardData.map((row) => {
  return row.map((cell) => {
    return cell === 0
      ? "Dots"
      : cell === 1 || cell === 7 || cell === 8 || cell === 9
      ? "Wall"
      : "Other";
  });
});

const initialPacmanPos = { x: -1, y: -1 };
const initialGhostPos = {
  red: { x: -1, y: -1 },
  pink: { x: -1, y: -1 },
  cyan: { x: -1, y: -1 },
  orange: { x: -1, y: -1 },
};

for (let y = 0; y < BOARD_HEIGHT; y++) {
  for (let x = 0; x < BOARD_WIDTH; x++) {
    switch (boardData[y][x]) {
      case 2:
        initialPacmanPos.y = y;
        initialPacmanPos.x = x;
        break;
      case 3:
        initialGhostPos.red.y = y;
        initialGhostPos.red.x = x;
        break;
      case 4:
        initialGhostPos.pink.y = y;
        initialGhostPos.pink.x = x;
        break;
      case 5:
        initialGhostPos.cyan.y = y;
        initialGhostPos.cyan.x = x;
        break;
      case 6:
        initialGhostPos.orange.y = y;
        initialGhostPos.orange.x = x;
        break;
    }
  }
}

if (initialPacmanPos.x === -1 || initialPacmanPos.y === -1)
  throw new Error("Pacman is not found in board-data.json");

export default class PacmanEngine {
  context: CanvasRenderingContext2D;
  frame: number;
  board: Board;
  pacman: Pacman;
  prePacmanPos: { x: number; y: number };
  ghosts: BaseGhost[];
  isPlaying: boolean;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.context.canvas.width = BOARD_WIDTH * CELL_SIZE;
    this.context.canvas.height = BOARD_HEIGHT * CELL_SIZE;
    this.frame = 0;
    this.isPlaying = false;

    this.board = JSON.parse(JSON.stringify(initialBoard));
    this.pacman = new Pacman(9, 9);
    this.prePacmanPos = { x: -1, y: -1 };

    this.ghosts = [];
    if (initialGhostPos.red.x !== -1 && initialGhostPos.red.y !== -1) {
      this.ghosts.push(
        new ShadowBlinky(initialGhostPos.red.x, initialGhostPos.red.y)
      );
    }
    if (initialGhostPos.pink.x !== -1 && initialGhostPos.pink.y !== -1) {
      this.ghosts.push(
        new SpeedyPinky(initialGhostPos.pink.x, initialGhostPos.pink.y)
      );
    }
    if (initialGhostPos.cyan.x !== -1 && initialGhostPos.cyan.y !== -1) {
      this.ghosts.push(
        new BashfulInky(initialGhostPos.cyan.x, initialGhostPos.cyan.y)
      );
    }
    if (initialGhostPos.orange.x !== -1 && initialGhostPos.orange.y !== -1) {
      this.ghosts.push(
        new PokeyClyde(initialGhostPos.orange.x, initialGhostPos.orange.y)
      );
    }
  }

  init() {
    this.board = JSON.parse(JSON.stringify(initialBoard));
    this.pacman = new Pacman(9, 9);

    this.ghosts = [];
    if (initialGhostPos.red.x !== -1 && initialGhostPos.red.y !== -1) {
      this.ghosts.push(
        new ShadowBlinky(initialGhostPos.red.x, initialGhostPos.red.y)
      );
    }
    if (initialGhostPos.pink.x !== -1 && initialGhostPos.pink.y !== -1) {
      this.ghosts.push(
        new SpeedyPinky(initialGhostPos.pink.x, initialGhostPos.pink.y)
      );
    }
    if (initialGhostPos.cyan.x !== -1 && initialGhostPos.cyan.y !== -1) {
      this.ghosts.push(
        new BashfulInky(initialGhostPos.cyan.x, initialGhostPos.cyan.y)
      );
    }
    if (initialGhostPos.orange.x !== -1 && initialGhostPos.orange.y !== -1) {
      this.ghosts.push(
        new PokeyClyde(initialGhostPos.orange.x, initialGhostPos.orange.y)
      );
    }
  }

  private isPacmanMovable() {
    let newX = this.pacman.posX;
    let newY = this.pacman.posY;

    switch (this.pacman.direction) {
      case Direction.Up:
        newY--;
        break;
      case Direction.Down:
        newY++;
        break;
      case Direction.Left:
        newX--;
        break;
      case Direction.Right:
        newX++;
        break;
    }

    if (newX < 0 || newX >= BOARD_WIDTH) return false;
    if (newY < 0 || newY >= BOARD_HEIGHT) return false;
    if (this.board[newY][newX] === "Wall") return false;

    return true;
  }

  private checkHit() {
    return this.ghosts.some((ghost) => {
      return ghost.posX === this.pacman.posX && ghost.posY === this.pacman.posY;
    });
  }

  private checkClear() {
    return this.board.every((row) => {
      return row.every((cell) => {
        return cell !== "Dots";
      });
    });
  }

  private drawBoard() {
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      for (let x = 0; x < BOARD_WIDTH; x++) {
        switch (this.board[y][x]) {
          case "Dots":
            this.context.beginPath();
            this.context.arc(
              x * CELL_SIZE + CELL_SIZE / 2,
              y * CELL_SIZE + CELL_SIZE / 2,
              CELL_SIZE / 10,
              0,
              Math.PI * 2
            );
            this.context.fillStyle = "white";
            this.context.fill();
            this.context.closePath();
            break;

          case "Wall":
            this.context.beginPath();
            this.context.rect(
              x * CELL_SIZE,
              y * CELL_SIZE,
              CELL_SIZE,
              CELL_SIZE
            );
            this.context.fillStyle = "blue";
            this.context.fill();
            this.context.closePath();
            break;
        }
      }
    }
  }

  private drawPacman(argument: number = 45) {
    this.context.beginPath();
    this.context.fillStyle = "yellow";

    const centerX = this.pacman.posX * CELL_SIZE + CELL_SIZE / 2;
    const centerY = this.pacman.posY * CELL_SIZE + CELL_SIZE / 2;

    this.context.arc(
      centerX,
      centerY,
      CELL_SIZE / 2.5,
      toRad(-argument - 90 * this.pacman.direction),
      toRad(argument - 90 * this.pacman.direction),
      true
    );
    this.context.fill();

    this.context.closePath();

    this.context.beginPath();
    this.context.fillStyle = "black";

    const radius = CELL_SIZE / 2;

    this.context.moveTo(centerX, centerY);
    this.context.lineTo(
      centerX +
        radius * Math.sin(toRad(90 - argument + 90 * this.pacman.direction)),
      centerY +
        radius * Math.cos(toRad(90 - argument + 90 * this.pacman.direction))
    );
    this.context.lineTo(
      centerX +
        radius * Math.sin(toRad(90 + argument + 90 * this.pacman.direction)),
      centerY +
        radius * Math.cos(toRad(90 + argument + 90 * this.pacman.direction))
    );

    this.context.fill();
    this.context.closePath();
  }

  private drawGhosts() {
    this.ghosts.forEach((ghost) => {
      // relative position
      const x = ghost.posX * CELL_SIZE + CELL_SIZE / 2;
      const y = ghost.posY * CELL_SIZE + CELL_SIZE / 2;

      this.context.translate(x, y);

      // thanks to http://www.java2s.com/example/javascript-book/pacman-and-ghost.html
      const radius = CELL_SIZE / 2;
      const feet = 4;
      const head_radius = radius * 0.8;
      const foot_radius = head_radius / feet;

      this.context.fillStyle = ghost.color;
      this.context.lineWidth = radius * 0.05;
      this.context.beginPath();
      for (let foot = 0; foot < feet; foot++) {
        this.context.arc(
          2 * foot_radius * (feet - foot) - head_radius - foot_radius,
          radius - foot_radius,
          foot_radius,
          0,
          Math.PI
        );
      }
      this.context.lineTo(-head_radius, radius - foot_radius);
      this.context.arc(
        0,
        head_radius - radius,
        head_radius,
        Math.PI,
        2 * Math.PI
      );
      this.context.closePath();
      this.context.fill();
      this.context.stroke();

      this.context.fillStyle = "white";
      this.context.beginPath();
      this.context.arc(
        -head_radius / 2.5,
        -head_radius / 2,
        head_radius / 3,
        0,
        2 * Math.PI
      );
      this.context.fill();
      this.context.beginPath();
      this.context.arc(
        head_radius / 3.5,
        -head_radius / 2,
        head_radius / 3,
        0,
        2 * Math.PI
      );
      this.context.fill();

      this.context.fillStyle = "black";
      this.context.beginPath();
      this.context.arc(
        -head_radius / 2,
        -head_radius / 2.2,
        head_radius / 8,
        0,
        2 * Math.PI
      );
      this.context.fill();
      this.context.beginPath();
      this.context.arc(
        head_radius / 4,
        -head_radius / 2.2,
        head_radius / 8,
        0,
        2 * Math.PI
      );
      this.context.fill();

      this.context.translate(-x, -y);
    });
  }

  private resetCanvas() {
    this.context.clearRect(
      0,
      0,
      BOARD_WIDTH * CELL_SIZE,
      BOARD_HEIGHT * CELL_SIZE
    );
  }

  private render() {
    this.drawBoard();
    this.drawPacman();
    this.drawGhosts();
  }

  async animate(playIntro: boolean) {
    if (playIntro) {
      this.drawBoard();
      this.drawPacman();
      new Audio("/se/pacman_beginning.wav").play();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.drawGhosts();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      this.isPlaying = true;
    }

    this.frame++;
    if (this.frame % 30 == 0) new Audio("/se/pacman_siren.mp3").play();

    if (this.frame % 25 === 0) {
      if (this.isPacmanMovable()) {
        this.pacman.move();
      }

      this.ghosts.forEach((ghost) => {
        ghost.move(
          this.board,
          { posX: this.pacman.posX, posY: this.pacman.posY },
          this.frame
        );
      });

      if (this.checkHit()) {
        this.isPlaying = false;
      }

      if (this.checkClear()) {
        this.isPlaying = false;
      }

      if (this.board[this.pacman.posY][this.pacman.posX] === "Dots") {
        new Audio("/se/pacman_chomp.mp3").play();
        this.board[this.pacman.posY][this.pacman.posX] = "Other";
      }
    }

    this.resetCanvas();
    this.drawBoard();

    const pacmanMouthArgument = (frame: number) => {
      if (frame < 5) return 10;
      if (frame < 10) return 45;
      if (frame < 15) return 80;
      if (frame < 20) return 45;
      return 10;
    };
    const pacmanFrame = this.frame % 25;
    this.drawPacman(pacmanMouthArgument(pacmanFrame));
    this.drawGhosts();

    if (this.isPlaying) {
      requestAnimationFrame(() => {
        this.animate(false);
      });
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      new Audio("/se/pacman_death.wav").play();
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
