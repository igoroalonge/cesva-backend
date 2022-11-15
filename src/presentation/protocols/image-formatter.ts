export interface ImageFormatter {
  setHeigth: (value: number) => Promise<Buffer>
  setWidth: (value: number) => Promise<Buffer>
  rotate: (deg: number) => Promise<Buffer>
  normalize: () => Promise<Buffer>
  update: (buffer?: Buffer) => Promise<void>
  get buffer (): Promise<Buffer>
}