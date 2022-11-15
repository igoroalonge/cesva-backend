import { ILocalRecognitionModel } from '@/domain/models'
import { ILocalRecognitions } from '@/domain/usecases/local/recognitions'

export class LocalRecognitions implements ILocalRecognitions {
  recognitions: ILocalRecognitionModel[] = []
  minScore = 0.5
  
  constructor(recognitions: ILocalRecognitionModel[]) {
    this.recognitions = recognitions
  }

  async bestFromAll(): Promise<[ILocalRecognitionModel,number]> {
    let bestIndex = undefined
    this.recognitions.map((prediction, index) => {
      if (prediction.score >= this.minScore) {
        if (!bestIndex) {
          bestIndex = index
        }else if (this.recognitions[bestIndex].score <= prediction.score) {
          bestIndex = index
        }
      }
    })
    return [this.recognitions[bestIndex],bestIndex]
  }

  async bestFromModel(model: string): Promise<[ILocalRecognitionModel,number]> {
    let bestIndex = undefined
    this.recognitions.map((prediction, index) => {
      if (prediction.score >= this.minScore && prediction.class === model) {
        if (!bestIndex) {
          bestIndex = index
        }else if (this.recognitions[bestIndex].score <= prediction.score) {
          bestIndex = index
        }
      }
    })
    return [this.recognitions[bestIndex], bestIndex]
  }
}