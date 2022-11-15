import WebSocket from "ws"
import * as fs from "fs"
import { SocketWrapper } from "@/domain/models"
import { Event } from "@/domain/usecases"

export class WebSocketServer {
  private ws: WebSocket.Server
  private events: Event[] = []

  constructor(port: number) {
    this.ws = new WebSocket.Server({
      port
    })
  }

  async generateUniqueId() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }
    return s4() + s4() + '-' + s4()
  }

  async generatePhotosFolder(id: string) {
    if (!fs.existsSync(`photos/${id}/`)) {
      await fs.mkdirSync(`photos/${id}/`)
    }
  }

  private callEvent(name: string, args: string[], socket: SocketWrapper) {
    let found = false
    this.events.map(event => {
      if (event.name === name) {
        event.callback(socket, args)
        found = true
      }
    })
    if (!found) {
      socket.send(`WebSocketServer: command not found (${name})`)
    }
  }

  public addEvent(event: Event) {
    console.log(`WebSocketServer: new event added (${event.name})`)
    this.events.push(event)
  }

  public listen() {
    this.ws.on("connection", async (socket: SocketWrapper) => {
      socket.id = await this.generateUniqueId()
      await this.generatePhotosFolder(socket.id)

      console.log(`WebSocketServer: new connection established (id:${socket.id})`)
      socket.on("message", (messageBuffer: Buffer) => {
        const message = messageBuffer.toString()
        const args = message.trim().split(/ +/g);
        const name = args.shift().toLowerCase();
        this.callEvent(name, args, socket)
      })
    })

    this.ws.on("close", () => {
      console.log("Conexão fechada");
    })
  }
}