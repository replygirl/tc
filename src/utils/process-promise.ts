import devoid from './devoid'
import tryToAwait from './try-to-await'

import type { MaybePromise } from '../index.types'
import type { TcErrorHandler, TcReturn } from '../tc.types'

export default function <T>(
  x: MaybePromise<T>,
  fb?: TcErrorHandler<T>
): TcReturn<T> {
  return x instanceof Promise
    ? tryToAwait<T>(x, fb)
    : [devoid(x)]
}
