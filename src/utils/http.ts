import { ApiError } from '@/services/ApiError'

interface HttpResponse<T> extends Response {
  parsedBody?: T
}

async function http<T> (
  request: RequestInfo
): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(
    request
  )

  try {
    response.parsedBody = await response.json()
  } catch (ex) {}

  if (!response.ok) {
    throw new ApiError(response.status)
  }
  return response
}

export async function get<T> (
  path: string,
  args: RequestInit = { method: 'get' }
): Promise<HttpResponse<T>> {
  return await http<T>(new Request(path, args))
}
