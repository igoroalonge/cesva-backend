import { LocalRecognitions } from '@/data/usecases/local/recognitions/recognitions'
import { ILocalRecognitionModel } from '@/domain/models'

export interface ILocalRecognizer {
  recognize: (buffer: Buffer) => Promise<void>
  get predictions(): ILocalRecognitionModel[]
  get recognitions(): LocalRecognitions
}