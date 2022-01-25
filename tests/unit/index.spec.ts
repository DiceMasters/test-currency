import { shallowMount } from '@vue/test-utils'
import UpdateRoutes from '@/mixins/updateRoutes'
import { TApiLatestData } from '@/types/api'

describe('ConvertInput.vue', () => {
  const wrapper = shallowMount(UpdateRoutes)

  it('Приходит ли массив рейтов?', () => {
    // expect.assertions(1)
    wrapper.vm.updateRates('RUB')
      .then(response => {
        expect(typeof (response as TApiLatestData)['AED']).toBe('number')
      })
  })
})
