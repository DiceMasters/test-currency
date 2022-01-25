<template>
  <v-app-bar app
             class="c-header"
             elevation="0"
             color="green"
             dark>
    <v-container>
      <v-row>
        <v-col>
          <div class="d-flex align-center">
            <p class="mb-0">
              Currency App
            </p>

            <v-spacer/>

            <v-btn class="mr-2"
                   text
                   :to="{name: 'Конвертер'}">
              <span>
                Конвертер
              </span>
            </v-btn>

            <v-btn text
                   :to="{name: 'Курсы валют'}">
              <span>
                Курсы валют
              </span>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CHeader extends Vue {}
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
