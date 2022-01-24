/* eslint-disable */
import { TinyEmitter } from 'tiny-emitter'

type TEFunction = (...args: any) => any

const emitter = new TinyEmitter()

export default {
  $on: (...args: [string, TEFunction]): TinyEmitter => emitter.on(...args),
  $once: (...args: [string, TEFunction]): TinyEmitter => emitter.once(...args),
  $off: (...args: [string, TEFunction | undefined]): TinyEmitter => emitter.off(...args),
  $emit: (...args: [string, any]): TinyEmitter => emitter.emit(...args)
}
