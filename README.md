# Pac-Man

Pac-Man via image recognition

## Overview

![demo](./demo.png)

Through the webcam, your movements make Pacman move up, down, left and right. Run from the four colorful ghosts.

## Features

This project is a reconstruction of the [TensorFlow.js DEMO](https://storage.googleapis.com/tfjs-examples/webcam-transfer-learning/dist/index.html).

Our Pacman project written in [Next.js](https://nextjs.org/). In particular, the image was classified into four classes using MobileNet's transfer learning in [Tensorflow.js](https://www.tensorflow.org/), and each class was adapted to move up, down, left and right.

## Dependencies

- Next.js v13.5.6
- React v18
- Tensorflow.js v4.12.0
  - imagenet/mobilenet v3 small

## Setup

- Clone the repository

```zsh
git clone git@github.com:dike-okayama/Pac-Man.git && cd Pac-Man
```

- Install dependencies

```zsh
npm install
```

## Usage

```zsh
npm run dev
```
