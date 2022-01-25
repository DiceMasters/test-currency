<template>
  <v-app>
    <c-header/>

    <v-main>
      <router-view/>
    </v-main>

    <v-snackbar v-model="snackbar"
                vertical>
      {{ errorText }}

      <template v-slot:action="{ attrs }">
        <v-btn text
               v-bind="attrs"
               @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import CHeader from '@/components/layout/Header'
import bus from './utils/bus'

@Component({
  components: {
    'c-header': CHeader
  }
})
export default class App extends Vue {
  errorText = ''
  snackbar = false

  created (): void {
    bus.$on('updateError', (errorText: string) => {
      this.errorText = errorText
      this.snackbar = true
    })
  }

  resetError (): void {
    this.errorText = ''
    this.snackbar = false
  }
}
</script>
