import jimp from 'jimp'
import { ImageFormatter } from '@/presentation/protocols/image-formatter'

export class ImageFormatterAdapter implements ImageFormatter {
  private _image: any

  async update(buffer: Buffer): Promise<void> {
    this._image = await jimp.read(buffer)
  }

  async setHeigth(value: number): Promise<Buffer> {
    const buffer = await this._image.resize(jimp.AUTO, value).getBufferAsync(jimp.MIME_JPEG)
    return buffer
  }

  async setWidth(value: number): Promise<Buffer> {
    const buffer = this._image.resize(250, jimp.AUTO).getBufferAsync(jimp.MIME_JPEG)
    return buffer
  }

  async rotate(deg: number): Promise<Buffer> {
    const buffer = await this._image.rotate(deg).getBufferAsync(jimp.MIME_JPEG)
    return buffer
  }

  async normalize(): Promise<Buffer> {
    const buffer = await this._image.normalize().getBufferAsync(jimp.MIME_JPEG)
    return buffer
  }

  get buffer(): Promise<Buffer> {
    return this._image.getBufferAsync(jimp.MIME_JPEG)
  }
}
