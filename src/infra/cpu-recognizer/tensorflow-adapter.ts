const tf = require("@tensorflow/tfjs-node")
const cocoSsd = require('@tensorflow-models/coco-ssd')

import { ICPURecognizer } from '@/data/protocols/cpu-recognizer'
import { ILocalRecognitionModel } from '@/domain/models'

export class TensorflowAdapter implements ICPURecognizer {
  decodeId = 3
  constructor(decodeId?: number) {
    this.decodeId = decodeId
  }

  async detect(buffer: Buffer): Promise<ILocalRecognitionModel[]> {
    const image = await tf.node.decodeImage(buffer, 3)
    const model = await cocoSsd.load()
    const predictions = await model.detect(image) as ILocalRecognitionModel[]
    return predictions
  }
}
