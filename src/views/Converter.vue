<template>
  <v-container class="v-converter d-flex align-center justify-center">
    <v-row>
      <v-col>
        <c-convert-input/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CConvertInput from '@/components/ConvertInput'

@Component({
  components: {
    'c-convert-input': CConvertInput
  }
})
export default class CConverter extends Vue {}
</script>

<style lang="scss">
.v-converter {
  height: 100%;
}
</style>
