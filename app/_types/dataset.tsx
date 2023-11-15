import * as tf from "@tensorflow/tfjs";

import type { Class } from "@/app/_types/model";

export type DatasetType = {
  [key in Class]: tf.Tensor3D[];
};
