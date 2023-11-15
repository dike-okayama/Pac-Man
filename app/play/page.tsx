"use client";

import { useState, useEffect, useRef } from "react";

import BackButton from "@/app/_components/BackButton/BackButton";
import PacmanEngine from "@/app/_services/pacmanEngine";

import { Direction } from "@/app/_types/pacman";
import * as styles from "./page.css";

type Message = "Ready!" | "" | "GAME OVER";

export default function Play() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [displayedText, setDisplayedText] = useState<Message>("");

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pacmanEngine = new PacmanEngine(ctx);
    addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          pacmanEngine.pacman.changeDirection(Direction.Up);
          break;
        case "ArrowDown":
          pacmanEngine.pacman.changeDirection(Direction.Down);
          break;
        case "ArrowLeft":
          pacmanEngine.pacman.changeDirection(Direction.Left);
          break;
        case "ArrowRight":
          pacmanEngine.pacman.changeDirection(Direction.Right);
          break;
      }
    });

    pacmanEngine.animate(true);
    setDisplayedText("Ready!");
    const timer = setTimeout(() => {
      setDisplayedText("");
    }, 5000);

    return () => {
      clearTimeout(timer);
      pacmanEngine.isPlaying = false;
    };
  }, []);

  return (
    <div className={styles.playRoot}>
      <BackButton />
      <div className={styles.board}>
        <canvas ref={canvasRef}></canvas>
      </div>
      <p className={styles.message}>{displayedText}</p>
    </div>
  );
}
