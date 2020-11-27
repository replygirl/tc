import devoidPromise from './devoid-promise'

import type { Devoided } from './devoid.types'
import type { MaybePromise } from '../index.types'

export default function <T = unknown>(
  x?: MaybePromise<T | void>
): MaybePromise<Devoided<T>> {
  return x === void 0
    ? undefined
    : x instanceof Promise
    ? devoidPromise<T>(x)
    : x
}
