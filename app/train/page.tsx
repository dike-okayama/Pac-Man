"use client";

import { useEffect, useState, useMemo, useRef } from "react";

import * as tf from "@tensorflow/tfjs";

import BackButton from "@/app/components/BackButton/BackButton";
import Webcam from "@/app/components/Webcam/Webcam";
import { dataset, addData } from "@/app/services/dataset";
import { train, predict } from "@/app/services/model";
import type { Class } from "@/app/types/model";

import * as styles from "./page.css";

export default function Train() {
  const [isPredicting, setIsPredicting] = useState(false);
  const [prediction, setPrediction] = useState<number>();

  const webcamRef = useRef<HTMLVideoElement>(null);
  const MemorizedWebcam = useMemo(() => {
    return <Webcam innerRef={webcamRef} />;
  }, []); // Not sure, wrapping by useMemo fixes the flickering problem

  useEffect(() => {
    if (!isPredicting) return;

    const interval = setInterval(async () => {
      const prediction = tf.tidy(() => {
        if (webcamRef.current === null) return;
        return predict(
          tf.browser
            .fromPixels(webcamRef.current)
            .slice([0, 80, 0], [480, 480, 3])
        );
      });

      setPrediction(prediction);
    }, 50);

    return () => clearInterval(interval);
  }, [isPredicting]);

  return (
    <div className={styles.trainRoot}>
      <BackButton />
      <div className={styles.boxContainer}>
        <div />
        <DirectionButtonBox name="Up" highlight={prediction === 0} />
        <div />
        <DirectionButtonBox name="Left" highlight={prediction === 1} />
        <div className={styles.box}>{MemorizedWebcam}</div>
        <DirectionButtonBox name="Right" highlight={prediction === 2} />
        <div />
        <DirectionButtonBox name="Down" highlight={prediction === 3} />
        <TrainButtonBox
          beforeTrain={() => {
            setIsPredicting(false);
            setPrediction(undefined);
          }}
          afterTrain={() => {
            setIsPredicting(true);
          }}
        />
      </div>
    </div>
  );
}

const DirectionButtonBox = ({
  name,
  highlight = false,
}: {
  name: Class;
  highlight?: boolean;
}) => {
  // Use state to force re-rendering counter value when dataset changes
  const [count, setCount] = useState(dataset[name].length);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (dataset[name].length === 0) return;
    if (canvasRef.current === null) return;
    const thumbnail = dataset[name][dataset[name].length - 1] as tf.Tensor3D;
    tf.browser.toPixels(thumbnail, canvasRef.current);
  }, [count]);

  useEffect(() => {
    if (!isMouseDown) return;
    const webcam = document.querySelector("#video") as HTMLVideoElement;

    const interval = setInterval(() => {
      addData(
        name,
        tf.browser.fromPixels(webcam).slice([0, 80, 0], [480, 480, 3])
      );
      setCount(dataset[name].length);
    }, 70);
    return () => clearInterval(interval);
  }, [isMouseDown]);

  return (
    <div
      className={`${styles.box} ${highlight && styles.boxHighlighted}`}
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
      <canvas className={styles.thumbnail} ref={canvasRef}></canvas>
    </div>
  );
};

const TrainButtonBox = ({
  beforeTrain,
  afterTrain,
}: {
  beforeTrain: () => void;
  afterTrain: () => void;
}) => {
  const [loss, setLoss] = useState<number>();

  return (
    <div
      className={`${styles.box} ${styles.trainButton}`}
      onClick={async () => {
        beforeTrain();
        await train(
          [...dataset.Up, ...dataset.Left, ...dataset.Right, ...dataset.Down],
          [
            ...Array(dataset.Up.length).fill(0),
            ...Array(dataset.Left.length).fill(1),
            ...Array(dataset.Right.length).fill(2),
            ...Array(dataset.Down.length).fill(3),
          ],
          {
            onEpochEnd: (_, logs: any) => {
              setLoss(logs.loss);
            },
          }
        );
        afterTrain();
      }}
    >
      TRAIN
      <p>{loss?.toFixed(4)}</p>
    </div>
  );
};

const buttonShapeMapping = {
  Up: { borderTopLeftRadius: "50%", borderTopRightRadius: "50%" },
  Left: { borderTopLeftRadius: "50%", borderBottomLeftRadius: "50%" },
  Right: { borderTopRightRadius: "50%", borderBottomRightRadius: "50%" },
  Down: { borderBottomLeftRadius: "50%", borderBottomRightRadius: "50%" },
};
