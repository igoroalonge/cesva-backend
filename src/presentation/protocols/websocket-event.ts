import { SocketWrapper } from "@/domain/models"

export abstract class Event {
  public name: string
  public abstract callback(client: SocketWrapper, args: string[]): any
}
