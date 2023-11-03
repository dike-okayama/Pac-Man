"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import BackButton from "../components/BackButton/BackButton";
import * as styles from "./page.css";
import boardData from "./board-data.json";

export default function Play() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;
  }, [isPlaying]);

  return (
    <div className={styles.playRoot}>
      <BackButton />
      <div className={styles.board}>
        {boardData.map((row, rowIndex) => (
          <div className={styles.row} key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <div className={styles.cell} key={cellIndex}>
                {cell === 0 && <Food />}
                {cell === 1 && <Wall color="blue" />}
                {cell === 2 && <Pacman />}
                {cell === 3 && <Ghost color="red" />}
                {cell === 4 && <Ghost color="pink" />}
                {cell === 5 && <Ghost color="orange" />}
                {cell === 7 && <Wall color="red" />}
                {cell === 8 && <Wall color="green" />}
                {cell === 9 && <Wall color="yellow" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const Wall = ({ color }: { color: string }) => {
  return <div className={styles.cell} style={{ backgroundColor: color }}></div>;
};

const Food = () => {
  return <div className={`${styles.cell} ${styles.food}`}></div>;
};

const Pacman = () => {
  return (
    <div className={styles.cell}>
      <Image src="/pacman.svg" alt="pacman" height={20} width={20} />
    </div>
  );
};

const Ghost = ({ color }: { color: string }) => {
  return (
    <div className={styles.cell}>
      <Image src={`/ghost-${color}.png`} alt="ghost" height={20} width={20} />
    </div>
  );
};
