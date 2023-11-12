"use client";

import React, { useEffect } from "react";

import * as styles from "./Webcam.css";

export default function Webcam({
  innerRef,
}: {
  innerRef?: React.Ref<HTMLVideoElement>;
}) {
  const enableCam = async () => {
    if (!hasGetUserMedia()) {
      alert(
        "Your browser cannot stream from your webcam. Please switch browsers."
      );
    }

    const constraints = {
      video: true,
      width: 480,
      height: 480,
      aspectRatio: 1,
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoElement = document.querySelector("#video") as HTMLVideoElement;

    if (videoElement !== null) videoElement.srcObject = stream;
  };

  useEffect(() => {
    enableCam();
  });

  return (
    <video
      id="video"
      autoPlay={true}
      className={styles.webcam}
      ref={innerRef}
    />
  );
}

function hasGetUserMedia() {
  return !!(
    navigator &&
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia
  );
}
