import { ICPURecognizer } from '@/data/protocols/cpu-recognizer'
import { mockCarImageBuffer, mockLocalRecognitions } from '@/data/test'
import { ILocalRecognitionModel } from '@/domain/models'
import { LocalRecognizer } from './recognizer'

const makeCPURecognizer = (): ICPURecognizer => {
  class CPURecognizerStub implements ICPURecognizer {
    async detect(buffer: Buffer): Promise<ILocalRecognitionModel[]> {
      return mockLocalRecognitions
    }
  }
  return new CPURecognizerStub()
}

interface SutTypes {
  sut: LocalRecognizer
  CPURecognizer: ICPURecognizer
}

const makeSut = (): SutTypes => {
  const CPURecognizer = makeCPURecognizer()
  const sut = new LocalRecognizer(CPURecognizer)
  return {
    sut,
    CPURecognizer
  }
}

describe('Local Recognizer', () => {
  test('Should return predictions if recognize', async () => {
    const { sut } = makeSut()
    const carImageBuffer = await mockCarImageBuffer()
    await sut.recognize(carImageBuffer)
    expect(sut.predictions).toBe(mockLocalRecognitions)
  })

  test('Should return best vehicle if recognize', async () => {
    const { sut } = makeSut()
    const carImageBuffer = await mockCarImageBuffer()
    await sut.recognize(carImageBuffer)
    const [vehicleElement, index] = await sut.recognitions.bestFromAll()
    expect(vehicleElement).toMatchObject({
      class: 'motorbike',
      score: 500,
      bbox: []
    })
    expect(index).toBe(1)
  })

  test('Should return best vehicle from an class if recognize', async () => {
    const { sut } = makeSut()
    const carImageBuffer = await mockCarImageBuffer()
    await sut.recognize(carImageBuffer)
    const [vehicleElement, index] = await sut.recognitions.bestFromModel('car')
    expect(vehicleElement).toMatchObject({
      class: 'car',
      score: 400,
      bbox: []
    })
    expect(index).toBe(2)
  })

  test('Should throw if CPURecognizer throws', async () => {
    const { sut, CPURecognizer } = makeSut()
    const carImageBuffer = await mockCarImageBuffer()
    jest.spyOn(CPURecognizer, 'detect').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.recognize(carImageBuffer)
    await expect(promise).rejects.toThrow()
  })
})