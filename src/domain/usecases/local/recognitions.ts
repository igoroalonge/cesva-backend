import { ILocalRecognitionModel } from '@/domain/models'

export interface ILocalRecognitions {
  bestFromAll: () => Promise<[ILocalRecognitionModel, number]>
  bestFromModel: (model: string) => Promise<[ILocalRecognitionModel, number]>
}
