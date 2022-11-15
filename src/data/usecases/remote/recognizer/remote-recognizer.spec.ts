import { IRemoteRecognizerParams } from '@/domain/usecases'
import { IRemoteRecognitionData } from '@/domain/models'
import { RemoteRecognizer } from './remote-recognizer'
import { HttpPostClientSpy, mockCarImageBase64 } from '@/data/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RemoteRecognizer
  httpPostClientSpy: HttpPostClientSpy<IRemoteRecognizerParams, IRemoteRecognitionData>
}

const makeSut = (url: string = faker.internet.url(), apiKey: string = faker.datatype.string(10)): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<IRemoteRecognizerParams, IRemoteRecognitionData>()
  const sut = new RemoteRecognizer(url, apiKey, httpPostClientSpy)
  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    const upload = await mockCarImageBase64()
    await sut.recognize({ upload })

    expect(httpPostClientSpy.url).toBe(url)
  })
})