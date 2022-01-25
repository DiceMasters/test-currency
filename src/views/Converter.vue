<template>
  <v-container class="v-converter">
    <v-row>
      <v-col>
        <c-convert-input/>
        <!-- <div class="v-converter__controlls">
          <v-text-field v-model="baseAmount"
                        solo
                        :label="baseCurrency">
            <template v-slot:prepend>
              <v-select v-model="baseCurrency"
                        dense
                        outlined
                        :items="currentRates"
                        item-text="name"
                        item-value="name"/>
            </template>
          </v-text-field>

          <div class="v-converter__input-separator">
            IN
          </div>

          <v-text-field v-model="targetAmount"
                        solo
                        :label="targetCurrency">
            <template v-slot:prepend>
              <v-select v-model="targetCurrency"
                        dense
                        outlined
                        :items="currentRates"
                        item-text="name"
                        item-value="name"/>
            </template>
          </v-text-field>
        </div> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import CConvertInput from '@/components/ConvertInput'
import bus from '@/utils/bus'
import CurrencyApiService from '@/services/CurrencyApiService'
import { ApiError } from '@/services/ApiError'
import { TCurrency } from '@/types/main'

  interface ISelectCurrencyData {
    name: TCurrency
    value: number
  }

@Component({
  components: {
    'c-convert-input': CConvertInput
  }
})
export default class CConverter extends Vue {
  baseCurrency: TCurrency = 'USD'
  targetCurrency: TCurrency = 'RUB'

  baseAmount = 0
  targetAmount = 0

  // Рейт для конвертации базовой валюты к таргетной
  rate = 1

  currentRates: ISelectCurrencyData[] = []

  async created (): Promise<void> {
    // Принимаем с Header.vue эмит на изменение базовой валюты
    bus.$on('updateBaseCurrency', (cur: TCurrency) => {
      this.baseCurrency = cur
    })

    try {
      // this.updateRates()
    } catch (error) {
      console.error(error)
    }
  }

  async updateRates (): Promise<void> {
    const result = await CurrencyApiService.latest(this.baseCurrency)

    if (!(result instanceof ApiError)) {
      const rates: ISelectCurrencyData[] = [
        {
          name: this.baseCurrency,
          value: 1
        }
      ]

      for (const rate in result) {
        rates.push({
          name: rate as TCurrency,
          value: result[rate as TCurrency]
        })
      }

      this.currentRates = rates
      this.rate = result[this.targetCurrency]
    } else {
      const errorText = result.get().message

      bus.$emit('updateError', errorText)
    }
  }
}
</script>

<style lang="scss">
.v-converter {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  &__controlls {
    max-width: 100%;
    width: 740px;

    display: flex;
    margin: 0 auto;

    .v-input {
      &__slot {
        margin-bottom: 0 !important;

        & + .v-text-field__details {
          display: none;
        }
      }

      &__control {
        justify-content: center;
      }

      &__prepend-outer {
        margin-top: 0 !important;
        margin-bottom: 0;
      }
    }
  }

  &__input-separator {
    display: flex;
    align-items: center;

    flex-grow: 0;
    flex-shrink: 0;

    margin: 0 16px;
  }
}
</style>
