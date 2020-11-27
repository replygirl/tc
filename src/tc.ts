import devoid from './utils/devoid'
import processPromise from './utils/process-promise'

import type {
  TcCallback,
  TcErrorHandler,
  TcReturn
} from './tc.types'

/**
 * Execute a callback within a `try...catch` statement,
 * returning its return value and any errors
 *
 * @param {TcCallback} cb - Function attempted in `try`
 *
 * @param {TcErrorHandler} [fb]
 *     Error handler called from `catch`;
 *     may optionally return a fallback value
 *
 * @returns {TcReturn} [value, error]
 *
 * @example
 *
 *     // Basic usage
 *
 *     const [x, xe] = tc(() => true)
 *     console.info(x ?? xe) // true
 *
 *     const [y, ye] = tc(() => { throw new Error() })
 *     console.info(y ?? ye) // Error
 *
 *
 *     // With async functions
 *
 *     const [x, xe] = await tc(async () => true)
 *     console.info(x ?? xe) // true
 *
 *     const [y, ye] = await tc(async () => { throw new Error() })
 *     console.info(y ?? ye) // Error
 *
 *
 *     // Error handling
 *
 *     tc(() => { throw new Error() }, e => console.error(e)) // Error
 *
 *
 *     // Fallback values
 *
 *     const [x] = tc(() => true, e => false)
 *     console.info(x) // true
 *
 *     const [y] = tc(() => { throw new Error() }, e => false)
 *     console.info(y) // false
 */
export default function <T = unknown>(
  cb: TcCallback<T>,
  fb?: TcErrorHandler<T>
): TcReturn<T> {
  try {
    return processPromise<T>(cb(), fb)
  } catch (e: unknown) {
    return [devoid<T>(fb?.(e)), e]
  }
}
