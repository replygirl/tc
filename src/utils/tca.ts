import devoid from './devoid'

import type { TcErrorHandler, TcResult } from '../tc.types'

export default async function <T = unknown>(
  x: Promise<T>,
  fb?: TcErrorHandler<T>
): Promise<TcResult<T>> {
  try {
    return [devoid<T>(await x)]
  } catch (e: unknown) {
    return [devoid<T>(await fb?.(e)), e]
  }
}
