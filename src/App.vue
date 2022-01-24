<template>
  <v-app>
    <c-header/>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import CHeader from '@/components/layout/Header'

@Component({
  components: {
    'c-header': CHeader
  }
})
export default class App extends Vue {}
</script>
