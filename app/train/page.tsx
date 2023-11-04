"use client";

import { useEffect, useState } from "react";
import BackButton from "../components/BackButton/BackButton";
import * as styles from "./page.css";

export default function Train() {
  return (
    <div className={styles.trainRoot}>
      <BackButton />
      <div className={styles.boxContainer}>
        <div></div>
        <DirectionBox name="UP" />
        <div></div>
        <DirectionBox name="LEFT" />
        <div></div>
        <DirectionBox name="RIGHT" />
        <div></div>
        <DirectionBox name="DOWN" />
        <TrainButtonBox />
      </div>
    </div>
  );
}

type DirectionBoxProps = {
  name: "UP" | "LEFT" | "RIGHT" | "DOWN";
};

const buttonShapeMapping = {
  UP: { borderTopLeftRadius: "50%", borderTopRightRadius: "50%" },
  LEFT: { borderTopLeftRadius: "50%", borderBottomLeftRadius: "50%" },
  RIGHT: { borderTopRightRadius: "50%", borderBottomRightRadius: "50%" },
  DOWN: { borderBottomLeftRadius: "50%", borderBottomRightRadius: "50%" },
};

const DirectionBox = ({ name }: DirectionBoxProps) => {
  const [count, setCount] = useState(0);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (!isMouseDown) return;
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, 100);
    return () => clearInterval(interval);
  }, [isMouseDown]);

  return (
    <div
      className={styles.box}
      style={buttonShapeMapping[name]}
      onMouseUp={() => {
        setIsMouseDown(false);
      }}
      onMouseDown={() => {
        setIsMouseDown(true);
      }}
      onMouseLeave={() => {
        setIsMouseDown(false);
      }}
    >
      <p>{name}</p>
      <p>{count}</p>
    </div>
  );
};

const TrainButtonBox = () => {
  return (
    <div className={`${styles.box} ${styles.trainButton}`} onClick={() => {}}>
      TRAIN
    </div>
  );
};
