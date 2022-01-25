<template>
  <v-container class="v-currencies">
    <v-row>
      <v-col>
        <div class="v-currencies__base-setter mb-4">
          <v-select v-model="baseCurrency"
                    :items="currencies"
                    item-text="name"
                    item-value="name"
                    outlined
                    label="Базовая валюта"
                    @change="v => updateRates(v)"/>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <template v-if="loading">
        <v-col v-for="n in 9"
               :key="n"
               class="mb-8"
               sm="2"
               cols="6">
          <v-skeleton-loader type="card"/>
        </v-col>
      </template>

      <v-col v-else
             v-for="cur in currencies"
             :key="`currency-${cur.name}`"
             sm="2"
             cols="6">
        <v-card>
          <v-card-title>
            {{ cur.name }}
          </v-card-title>

          <v-card-title>
            {{ getCurrencyItem(cur.name, cur.rate) }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import MUpdateRoutes from '@/mixins/updateRoutes'
import { TCurrency } from '@/types/main'
import { Component, Mixins } from 'vue-property-decorator'

  interface ISelectData {
    name: TCurrency
    rate: number
  }

@Component
export default class VCurrencies extends Mixins(MUpdateRoutes) {
  baseCurrency: TCurrency = 'RUB'
  currencies: ISelectData[] = []

  loading = false

  created (): void {
    this.buildCurrencyList()
  }

  public async buildCurrencyList (): Promise<void> {
    this.loading = true

    const response = await this.updateRates(this.baseCurrency)

    if (response) {
      const curs: ISelectData[] = []

      for (const cur in response) {
        curs.push({
          name: cur as TCurrency,
          rate: response[cur as TCurrency]
        })
      }

      this.currencies = curs
      this.loading = false
    }
  }

  public getCurrencyItem (name: string, rate: number): string {
    const amount = rate.toFixed(3)

    return `${amount}${this.baseCurrency}`
  }
}
</script>

<style lang="scss">
.v-currencies {
  height: 100%;
}
</style>
