<template>
  <v-container class="v-converter">
    <v-row>
      <v-col>
        <div class="v-converter__controlls">
          <v-select/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { TCurrency } from '@/types/main'
import bus from '@/utils/bus'
import CurrencyApiService from '@/services/CurrencyApiService'
import { ApiError } from '@/services/ApiError'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CConverter extends Vue {
  baseCurrency: TCurrency = 'USD'
  targetCurrency: TCurrency = 'RUB'

  baseRate = 0
  targetRate = 0

  multiplier = 0

  created (): void {
    bus.$on('updateBaseCurrency', (cur: TCurrency) => {
      this.baseCurrency = cur
    })

    CurrencyApiService.latest(this.baseCurrency)
  }
}
</script>

<style lang="scss">
.v-converter {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
