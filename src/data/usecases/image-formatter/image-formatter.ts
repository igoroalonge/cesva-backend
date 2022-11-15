import { ImageFormatter } from "../../../presentation/protocols"

export const makeImageFormatter = (): ImageFormatter => {
  class ImageFormatterStub implements ImageFormatter {
    private _buffer = Buffer.alloc(1024)

    async update(buffer: Buffer): Promise<void> {
      return
    }

    async setHeigth(value: number): Promise<Buffer> {
      return this._buffer
    }

    async setWidth(value: number): Promise<Buffer> {
      return this._buffer
    }

    async rotate(deg: number): Promise<Buffer> {
      return this._buffer
    }

    async normalize(): Promise<Buffer> {
      return this._buffer
    }

    get buffer(): Promise<Buffer> {
      return new Promise((reject, resolve) => resolve(this._buffer))
    }
  }
  return new ImageFormatterStub()
}