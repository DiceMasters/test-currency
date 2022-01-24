<template>
  <v-app-bar app
             class="c-header"
             elevation="0"
             color="green"
             prominent
             dark>
    <v-container>
      <v-row>
        <v-col>
          <div class="d-flex align-center">
            <p class="mb-0">
              Currency App
            </p>

            <v-spacer/>

            <v-btn text
                   :to="{name: 'Конвертер'}">
              <span class="mr-2">
                Конвертер
              </span>
            </v-btn>

            <v-btn text
                   :to="{name: 'Курсы валют'}">
              <span class="mr-2">
                Курсы валют
              </span>
            </v-btn>

            <v-spacer/>

            <v-select v-model="baseCurrency"
                      :items="currencies"
                      chips
                      attach
                      outlined
                      small-chips
                      label="Base Currency"
                      @change="updateBaseCurrency"/>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { TCurrency } from '@/types/main'
import bus from '@/utils/bus'

@Component
export default class CHeader extends Vue {
  baseCurrency: TCurrency = 'USD'
  currencies: TCurrency[] = [
    'RUB',
    'USD',
    'EUR'
  ]

  updateBaseCurrency (value: TCurrency): void {
    bus.$emit('updateBaseCurrency', value)
  }
}
</script>

<style lang="scss">
.c-header {
  .v-toolbar__content {
    align-items: center;
  }

  .v-select {
    .v-input__slot {
      margin-bottom: 0;

      & + .v-text-field__details {
        display: none;
      }
    }
  }
}
</style>
