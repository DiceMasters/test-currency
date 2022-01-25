import { Component, Vue } from 'vue-property-decorator'
import { TApiLatestData } from '@/types/api'
import { ApiError } from '@/services/ApiError'
import CurrencyApiService from '@/services/CurrencyApiService'
import bus from '@/utils/bus'

@Component
export default class MUpdateRoutes extends Vue {
  public async updateRates (baseCurrency: string): Promise<TApiLatestData | undefined> {
    const result = await CurrencyApiService.latest(baseCurrency)

    if (!(result instanceof ApiError)) {
      return result
    } else {
      const errorText = result.get().message

      bus.$emit('updateError', errorText)
    }
  }
}
