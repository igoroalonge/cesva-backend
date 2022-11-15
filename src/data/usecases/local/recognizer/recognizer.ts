import { ICPURecognizer } from '@/data/protocols/cpu-recognizer'
import { ILocalRecognitionModel } from '@/domain/models'
import { ILocalRecognizer } from '@/domain/usecases'
import { LocalRecognitions } from '../recognitions/recognitions'

export class LocalRecognizer implements ILocalRecognizer {
  private CPURecognizer: ICPURecognizer
  private _predictions: ILocalRecognitionModel[] = []
  private _recognitions = new LocalRecognitions(this.predictions)
  
  constructor (CPURecognizer: ICPURecognizer) {
    this.CPURecognizer = CPURecognizer
  }

  async recognize(buffer: Buffer): Promise<void> {
    this._predictions = await this.CPURecognizer.detect(buffer)
    this._recognitions = new LocalRecognitions(this._predictions)
  }

  get predictions() {
    return this._predictions
  }

  get recognitions() {
    return this._recognitions
  }
}