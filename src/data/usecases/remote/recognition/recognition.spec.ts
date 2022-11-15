import { mockRemoteRecognitionData } from "@/data/test"
import { RemoteRecognition } from "./recognition"

describe("Recognition", () => {
  test("Should return best result", () => {
    const mockedVal = mockRemoteRecognitionData()
    const recognition = new RemoteRecognition(mockedVal)
    expect(recognition.bestResult).toBe(mockedVal.results[0])
  })
})
