import { IRemoteRecognitionData } from "@/domain/models";

export const fakePredictions = [{
  class: 'car',
  score: 300,
  bbox: []
},
{
  class: 'motorbike',
  score: 500,
  bbox: []
},
{
  class: 'car',
  score: 400,
  bbox: []
}]

export const mockRemoteRecognitionData = (): IRemoteRecognitionData => ({
  processing_time: 1.0,
  results: [{
    box: {
      xmin: -1,
      ymin: 0,
      xmax: -1,
      ymax: -100
    },
    plate: "v1.2.4",
    vehicle: {
      score: 10.23,
      type: "string",
      box: {
        xmax: 1.0,
        xmin: 1.0,
        ymax: 1.0,
        ymin: 1.0
      }
    },
    score: 10.5,
    dscore: -29.45,
    region: {
      code: "an",
      score: 0.0
    },
    color: undefined,
    model_make: undefined
  }, {
    box: {
      xmin: 100,
      ymin: 0,
      xmax: -1,
      ymax: 0
    },
    plate: "^5.0.0",
    vehicle: {
      score: -29.45,
      type: "object",
      box: {
        xmax: 1.0,
        xmin: 1.0,
        ymax: 1.0,
        ymin: 1.0
      }
    },
    score: 0.5,
    dscore: -29.45,
    region: {
      code: "gb",
      score: -0.5
    },
    color: undefined,
    model_make: undefined
  }],
  filename: "index.js",
  version: -1.0,
  timestamp: "Mon Aug 03 12:45:00",
  camera_id: 12345
})