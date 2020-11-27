import devoid from './devoid'
import tca from './tca'

import type { TcErrorHandler, TcReturn } from '../tc.types'
import type { MaybePromise } from '../index.types'

export default function <T>(
  x: MaybePromise<T>,
  fb?: TcErrorHandler<T>
): TcReturn<T> {
  return x instanceof Promise ? tca<T>(x, fb) : [devoid(x)]
}
