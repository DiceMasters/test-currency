const baseURL = 'https://freecurrencyapi.net/api/v2'
const apiKey = 'a0c1aa70-7d13-11ec-adf5-13fde3e2676c'
const fetchOptions: RequestInit = {
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json'
  }
}

class CurrencyApiService {
  public latest (baseCurrency: string) {
    return fetch(`${baseURL}/latest?apikey=${apiKey}&base_currency=${baseCurrency}`, {
      method: 'GET',
      ...fetchOptions
    })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  public historical (baseCurrency: string, dateFrom: string, dateTo: string) {
    return fetch(`${baseURL}/historical?apikey=${apiKey}&base_currency=${baseCurrency}&date_from=${dateFrom}&date_to=${dateTo}`, {
      method: 'GET',
      ...fetchOptions
    })
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export default new CurrencyApiService()
