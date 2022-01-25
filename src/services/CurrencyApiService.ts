import { get } from '@/utils/http'
import { IApiLatestResponse, TApiLatestData } from '@/types/api'
import { ApiError } from './ApiError'

const baseURL = 'https://freecurrencyapi.net/api/v2'
const apikey = 'a0c1aa70-7d13-11ec-adf5-13fde3e2676c'

class CurrencyApiService {
  public latest (baseCurrency: string): Promise<TApiLatestData | ApiError> {
    return get<IApiLatestResponse>(`${baseURL}/latest?apikey=${apikey}&base_currency=${baseCurrency}`)
      .then(data => {
        if (data.parsedBody) {
          return data.parsedBody.data
        }

        return new ApiError()
      })
      .catch(err => {
        console.error(err)

        return err
      })
  }

  public historical (baseCurrency: string, dateFrom: string, dateTo: string) {
    return get(`${baseURL}/historical?apikey=${apikey}&base_currency=${baseCurrency}&date_from=${dateFrom}&date_to=${dateTo}`)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export default new CurrencyApiService()
