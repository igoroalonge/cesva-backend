import { HttpResponse } from '.'

export type HttpPostParams<T> = {
  url: string
  headers?: any
  body?: T
}

export interface HttpPostClient<T, R> {
  post: (params: HttpPostParams<T>) => Promise<HttpResponse<R>>
}