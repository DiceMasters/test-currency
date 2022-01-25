import { TCurrency } from './main'

export type TApiLatestData = Record<TCurrency, number>

export interface IApiLatestResponse {
  data: TApiLatestData
  query: {
    apikey: string
    base_currency: string
    timestamp: number
  }
}
