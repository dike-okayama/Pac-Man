import * as tf from "@tensorflow/tfjs";

import type { Class } from "@/app/_types/model";
import type { DatasetType } from "@/app/_types/dataset";

export const dataset: DatasetType = { Up: [], Down: [], Left: [], Right: [] };

export const addData = (class_: Class, data: tf.Tensor3D) => {
  dataset[class_].push(data);
};
