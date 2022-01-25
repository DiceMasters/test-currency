<template>
  <div class="c-convert-input">
    <p class="text-body-2">
      Текст формата "15 usd in rub"
    </p>

    <v-text-field :value="value"
                  outlined
                  :label="label"
                  :loading="loading"
                  @input="_handleInput"/>

    <p v-if="error"
          class="text-body-2 error--text">
      {{ error }}
    </p>

    <p v-if="result && !loading">
      {{ `${result} ${targetCurrency}` }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator'
import MUpdateRoutes from '@/mixins/updateRoutes'
import { TApiLatestData } from '@/types/api'
import { TCurrency } from '@/types/main'

  interface ICacheData {
    from: TCurrency
    data: TApiLatestData
    timestamp: number
  }

@Component
export default class CConvertInput extends Mixins(MUpdateRoutes) {
  value = ''
  error = ''
  loading = false

  baseCurrency: TCurrency = 'USD'
  targetCurrency: TCurrency = 'RUB'

  amount = 0
  actualRates: TApiLatestData | null = null

  get rate (): number | null {
    return this.actualRates ? this.actualRates[this.targetCurrency] : null
  }

  get label (): string {
    return `${this.baseCurrency} TO ${this.targetCurrency}`
  }

  get result (): number | null {
    if (this.rate) {
      const result = this.amount * this.rate

      return Number(result.toFixed(2))
    }

    return null
  }

  public async _handleInput (value: string): Promise<void> {
    const regexp = new RegExp(/\d+\s{1}[A-Za-z]{3}\s{1}in\s{1}[A-Za-z]{3}$/)
    const stringIsValid = regexp.test(value)

    this.loading = true

    if (stringIsValid) {
      const currencies = value.match(/[A-Za-z]{3}/g)

      if (currencies) {
        this.baseCurrency = currencies[0].toUpperCase() as TCurrency
        this.targetCurrency = currencies[1].toUpperCase() as TCurrency

        const amount = value.match(/\d+\s/)

        if (amount && amount.length) {
          this.error = ''
          this.amount = Number(amount[0])

          /**
           * Перед отправкой запроса чекнем, есть ли в кэше актуальный
           * запрос конвертации и при необходимости заюзаем его
           */
          let response: TApiLatestData | undefined
          const cache = this.cachedValue(this.baseCurrency)

          if (cache) {
            this.actualRates = cache.data
          } else {
            response = await this.updateRates(this.baseCurrency)

            if (response) {
              // Записываем в кэш с актуальным timestamp
              const newCache: ICacheData[] = []

              newCache.push({
                from: this.baseCurrency,
                data: response,
                timestamp: Date.now() / 1000
              })

              this.saveCache(newCache)
              this.actualRates = response
            }
          }

          this.loading = false
        } else {
          this.error = 'Текст в формате "15 usd in rub"'
        }
      }
    }
  }

  public cachedValue (from: TCurrency): ICacheData | null {
    /**
     * Проверяем наличие актуальных данных TO->IN
     * Сверяем текущую дату и дату последнего запроса <1day
     */
    const cache = localStorage.getItem('converter-data')

    if (cache) {
      const cachedData = JSON.parse(cache) as ICacheData[]
      const currentTimestamp = Math.floor(Date.now() / 1000)
      const daySeconds = 86400

      const filteredData = cachedData.filter(data => (currentTimestamp - data.timestamp) <= daySeconds)
      const actualData = filteredData.find(data => data.from === from)

      this.saveCache(filteredData)

      if (actualData) return actualData
    }

    return null
  }

  public saveCache (data: ICacheData[]): void {
    if (data.length) {
      const json = JSON.stringify(data)

      localStorage.setItem('converter-data', json)
    } else {
      localStorage.removeItem('converter-data')
    }
  }
}
</script>

<style lang="scss">
.c-convert-input {
  max-width: 100%;

  width: 700px;
}
</style>
