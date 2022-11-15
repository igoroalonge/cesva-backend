import "dotenv/config"
import { LocalRecognizer, RemoteRecognizer } from './data/usecases'
import { AxiosHttpClient } from './infra/axios-http-client/axios-http-client'
import { TensorflowAdapter } from "./infra/cpu-recognizer/tensorflow-adapter"
import { PhotoEvent, WebSocketServer } from './presentation/controllers'
import { ImageFormatterAdapter } from './utils/image-formatter-adapter'

const websocketServer = new WebSocketServer(4000)

const localRecognizer = new LocalRecognizer(new TensorflowAdapter())
const imageFormatter = new ImageFormatterAdapter()
console.log(process.env.PLATE_RECOGNIZER_KEY)
const remoteRecognizer = new RemoteRecognizer('https://api.platerecognizer.com/v1/plate-reader', process.env.PLATE_RECOGNIZER_KEY, new AxiosHttpClient())

const photoEvent = new PhotoEvent(localRecognizer, remoteRecognizer, imageFormatter)
websocketServer.addEvent(photoEvent)

websocketServer.listen()