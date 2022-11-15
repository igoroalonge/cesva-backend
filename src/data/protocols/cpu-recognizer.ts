import { ILocalRecognitionModel } from '@/domain/models'

export interface ICPURecognizer {
  detect: (buffer: Buffer) => Promise<ILocalRecognitionModel[]>
}