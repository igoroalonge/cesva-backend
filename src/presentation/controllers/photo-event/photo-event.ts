import * as fs from "fs"
import { SocketWrapper } from "@/domain/models"
import { Event, ILocalRecognizer, IRemoteRecognizer } from "@/domain/usecases"
import { ImageFormatter } from "@/presentation/protocols"
import { RemoteRecognition } from '@/data/usecases'
import { v4 as uuidv4 } from 'uuid'

const ImageBufferFromBase64 = async (base64: string): Promise<Buffer> => {
  const base64data = base64
    .replace(/^data:image\/png;base64,/, "")
    .replace(/^data:image\/jpg;base64,/, "")
    .replace(/^data:image\/jpeg;base64,/, "")
  return Buffer.from(base64data, 'base64')
}

const DateToSimpleString = (d: Date): string => {
  var s = `${d.getDate()}-${(d.getMonth() + 1)}-${d.getFullYear()}-${d.getHours()}-${d.getMinutes()}`
  return s
}

export class PhotoEvent implements Event {
  name = "photo"

  constructor(
    readonly localRecognizer: ILocalRecognizer,
    readonly remoteRecognizer: IRemoteRecognizer,
    readonly imageFormatter: ImageFormatter
  ) { }

  public async callback(client: SocketWrapper, args: string[]): Promise<void> {
    try {
      console.log("PhotoEvent: Analysing image from local recognizer")
      const base64Image = args[0]

      const rawImageBuffer = await ImageBufferFromBase64(base64Image)
      console.log("PhotoEvent: Rotating and updating image.")
      await this.imageFormatter.update(rawImageBuffer)
      await this.imageFormatter.rotate(-90)
      const imageBuffer = await this.imageFormatter.normalize()

      await this.localRecognizer.recognize(imageBuffer)
      console.log("PhotoEvent: analized from local recognizer")

      const [bestLocalRecognition, index] = await this.localRecognizer.recognitions.bestFromModel("car")
      const nowDate = new Date()

      console.log("PhotoEvent: write into photo in local disk")
      fs.writeFile(`photos/${client.id}/${DateToSimpleString(nowDate)}-${uuidv4()}.jpg`, imageBuffer, (err) => err && console.log(err))

      if (!bestLocalRecognition) {
        console.log("PhotoEvent: local recognition returned nothing")
        client.send("photo")
        return
      }

      console.log("PhotoEvent: local recognition returned")
      console.log(bestLocalRecognition)
      const remoteRecognitionData = await this.remoteRecognizer.recognize({
        upload: base64Image
      })
      const remoteRecognition = new RemoteRecognition(remoteRecognitionData)
      if (!remoteRecognition.isValid) {
        console.log("PhotoEvent: remote recognition not valid")
        client.send("photo")
      }
      
      console.log(`PhotoEvent: remote recognition best plate is ${remoteRecognition.BestPlate}`)
      client.send("open")
      return
    } catch (error) {
      console.log(error)
      client.send("photo")
      return
    }
    return
  }
}