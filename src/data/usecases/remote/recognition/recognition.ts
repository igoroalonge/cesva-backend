import { IBoxModel, IRegionModel, IRemoteRecognitionData, IResultModel, IVehicleModel, IVehicleTypeModel } from "@/domain/models"
import { IRemoteRecognition } from "@/domain/usecases"

export class RemoteRecognition implements IRemoteRecognition {
  readonly processingTime: number
  readonly results: IResultModel[]
  readonly filename: string
  readonly version: number
  readonly timestamp: string
  readonly cameraId?: any
  readonly bestResult?: IResultModel
  readonly isValid: boolean

  constructor(data: IRemoteRecognitionData) {
    this.processingTime = data.processing_time
    this.results = data.results
    this.filename = data.filename
    this.version = data.version
    this.timestamp = data.timestamp
    this.cameraId = data.camera_id

    this.isValid = this.results.length > 0
    if (this.isValid) {
      let bestResult: IResultModel = this.results[0]
      this.results.map(r => {
        if (r.score > bestResult.score) {
          bestResult = r
        }
      })
      this.bestResult = bestResult
    }
  }

  get BestVehicle(): IVehicleModel {
    return this.bestResult.vehicle
  }
  get BestBox(): IBoxModel {
    return this.bestResult.box
  }
  get BestPlate(): string {
    return this.bestResult.plate
  }
  get BestScore(): number | string {
    return this.bestResult.score
  }
  get BestVehicleType(): IVehicleTypeModel {
    return this.bestResult.model_make
  }
  get BestRegion(): IRegionModel {
    return this.bestResult.region
  }
}