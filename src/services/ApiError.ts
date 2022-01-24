type TApiErrorCode = 200 | 429 | 404 | 500

interface IApiError {
  code: TApiErrorCode
  message: string
}

export class ApiError {
  errors: IApiError[] = [
    {
      code: 200,
      message: 'ok'
    },
    {
      code: 429,
      message: 'You have hit your rate-limit'
    },
    {
      code: 404,
      message: 'A requested resource does not exist'
    },
    {
      code: 500,
      message: 'Internal Server Error'
    }
  ]

  error: IApiError | null = null

  constructor (code: TApiErrorCode) {
    this.error = this.errors.find(err => err.code === code) || null
  }

  get () {
    return this.error || {
      code: 520,
      message: 'Unknown Error'
    }
  }
}
