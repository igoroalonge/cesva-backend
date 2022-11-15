import * as fs from 'fs'

const imageToBase64 = async (type: string, buffer: Buffer) => {
  const prefix = `data:image/${type};base64,`
  return buffer.toString('base64')
}

export const mockCarImageBuffer = async (): Promise<Buffer> => {
  return await fs.readFileSync('./src/data/test/recognition/mock-car.jpg')
}

export const mockNoCarImageBuffer = async (): Promise<Buffer> => {
  return await fs.readFileSync('./src/data/test/recognition/mock-no-car.jpg')
}

export const mockCarImageBase64 = async (): Promise<string> => {
  return await imageToBase64('jpg', await mockCarImageBuffer())
}

export const mockNoCarImageBase64 = async (): Promise<string> => {
  return await imageToBase64('jpg', await mockNoCarImageBuffer())
}