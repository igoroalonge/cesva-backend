import { IResultModel } from "../result-model"

export interface IRemoteRecognitionData {
  processing_time: number
  results: IResultModel[]
  filename: string
  version: number
  timestamp: string
  camera_id?: any
}
