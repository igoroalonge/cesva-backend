import {
  IBoxModel,
  IRegionModel,
  IResultModel,
  IVehicleModel,
  IVehicleTypeModel
} from "@/domain/models"

export interface IRemoteRecognition {
  readonly processingTime: number
  readonly results: IResultModel[]
  readonly filename: string
  readonly version: number
  readonly timestamp: string
  readonly cameraId?: any
  readonly bestResult?: IResultModel
  readonly isValid: boolean

  get BestVehicle(): IVehicleModel
  get BestBox(): IBoxModel
  get BestPlate(): string
  get BestScore(): string | number
  get BestVehicleType(): IVehicleTypeModel
  get BestRegion(): IRegionModel
}