import { Direction } from "@/app/_types/pacman";

export default class Pacman {
  posX: number;
  posY: number;
  direction: Direction;

  constructor(posX: number, posY: number) {
    this.posX = posX;
    this.posY = posY;
    this.direction = Direction.Right;
  }

  changeDirection(direction: Direction) {
    this.direction = direction;
  }

  move() {
    switch (this.direction) {
      case Direction.Up:
        this.posY--;
        break;
      case Direction.Down:
        this.posY++;
        break;
      case Direction.Left:
        this.posX--;
        break;
      case Direction.Right:
        this.posX++;
        break;
    }
  }
}
