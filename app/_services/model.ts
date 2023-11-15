import * as tf from "@tensorflow/tfjs";

const MOBILE_NET_INPUT_HEIGHT = 224;
const MOBILE_NET_INPUT_WIDTH = 224;
const CLASSES = 4;

let mobilenet: tf.GraphModel;
let model: tf.Sequential;

loadMobileNetFeatureModel();
loadModel();

/**
 * Loads the MobileNet model and warms it up so ready for use.
 */
async function loadMobileNetFeatureModel() {
  const URL =
    "https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1";

  mobilenet = await tf.loadGraphModel(URL, { fromTFHub: true });

  // Warm up the model by passing zeros through it once.
  tf.tidy(() => {
    mobilenet.predict(
      tf.zeros([1, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, 3])
    );
  });

  return mobilenet;
}

/**
 * Loads the Sequential model and warms it up so ready for use.
 */
function loadModel() {
  model = tf.sequential({
    layers: [
      tf.layers.dense({ inputShape: [1024], units: 128, activation: "relu" }),
      tf.layers.dense({ units: CLASSES, activation: "softmax" }),
    ],
  });

  model.compile({
    optimizer: "adam",
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });
}

export async function train(
  trainingDataInputs: tf.Tensor3D[],
  trainingDataOutputs: number[],
  callback?: tf.CustomCallbackArgs
) {
  tf.util.shuffleCombo(trainingDataInputs, trainingDataOutputs);
  const outputsAsTensor = tf.tensor1d(trainingDataOutputs, "int32");
  const oneHotOutputs = tf.oneHot(outputsAsTensor, CLASSES);

  const inputsAsTensor = tf.stack(
    trainingDataInputs.map((input) => {
      return tf.tidy(() => {
        const resizedTensorFrame = tf.image.resizeBilinear(
          input,
          [MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH],
          true
        );
        const normalizedTensorFrame = resizedTensorFrame.div(255);
        return (
          mobilenet.predict(normalizedTensorFrame.expandDims()) as tf.Tensor3D
        ).squeeze();
      });
    })
  );

  await model.fit(inputsAsTensor, oneHotOutputs, {
    shuffle: true,
    batchSize: 5,
    epochs: 10,
    callbacks: callback,
  });

  outputsAsTensor.dispose();
  oneHotOutputs.dispose();
  inputsAsTensor.dispose();
}

export function predict(input: tf.Tensor3D) {
  return tf.tidy(() => {
    const normalizedTensorFrame = input.div(255);
    const resizedTensorFrame = tf.image.resizeBilinear(
      normalizedTensorFrame as tf.Tensor3D,
      [MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH],
      true
    );

    const imageFeatures = mobilenet.predict(resizedTensorFrame.expandDims());
    const prediction = model.predict(
      imageFeatures as tf.Tensor<tf.Rank>
    ) as tf.Tensor<tf.Rank>;
    const predictionOneHot = prediction.argMax(1).arraySync() as number[];
    const predictionIndex = predictionOneHot[0];

    return predictionIndex;
  });
}
