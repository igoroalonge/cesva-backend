import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http'
import { InvalidCredentialsError } from '@/domain/errors'
import { UnexpectedError } from '@/domain/errors/unexpected-error'
import { IRemoteRecognitionData } from '@/domain/models'
import { IRemoteRecognizer, IRemoteRecognizerParams } from '@/domain/usecases'

export class RemoteRecognizer implements IRemoteRecognizer {
  constructor (
    private readonly url: string,
    private readonly apiKey: string,
    private readonly httpClient: HttpPostClient<IRemoteRecognizerParams, IRemoteRecognitionData>
  ) { }

  async recognize (params: IRemoteRecognizerParams): Promise<IRemoteRecognitionData> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `Token ${this.apiKey}`,
      }
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}