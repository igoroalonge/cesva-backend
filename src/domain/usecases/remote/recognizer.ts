import { IRemoteRecognitionData } from '@/domain/models'

export interface IRemoteRecognizer {
  recognize(params: IRemoteRecognizerParams): Promise<IRemoteRecognitionData>
}

export interface IRemoteRecognizerParams {
  upload: string
}