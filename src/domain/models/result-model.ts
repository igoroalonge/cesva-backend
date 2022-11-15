export interface IBoxModel {
  xmin: number,
  ymin: number,
  xmax: number,
  ymax: number
}

export interface IColorModel {
  color: string
  score: number
}

export interface IRegionModel {
  code: string,
  score: number
}

export interface IVehicleTypeModel {
  make: string
  model: string
  score: number
}

export interface IVehicleModel {
  score: number,
  type: string,
  box: IBoxModel
}

export interface IResultModel {
  box: IBoxModel
  plate: string
  vehicle: IVehicleModel
  score: number | string
  dscore: number | string
  region: IRegionModel
  color?: IColorModel[]
  model_make?: IVehicleTypeModel
}
