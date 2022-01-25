interface IApiError {
  code: number
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
    },
    {
      code: 520,
      message: 'Unknown Error'
    }
  ]

  error: IApiError | null = null

  constructor (code = 520) {
    this.error = this.errors.find(err => err.code === code) || null
  }

  get (): IApiError {
    return this.error as IApiError
  }
}
