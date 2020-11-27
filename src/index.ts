export type MaybePromise<T> = T | Promise<T>

/**
 * @callback tcErrorHandler
 * @param {unknown} e - An error
 * @return {*}
 */
export type TcErrorHandler<T> = (e: unknown) => MaybePromise<T> | void

/**
 * @typedef tcResult
 * @type {array}
 * @property {any} [0] - The value returned by the callback or fallback
 * @property {unknown} [1] - The error thrown by the callback
 */
export type TcResult<T> = [T?, unknown?]

/**
 * Execute a callback within a `try...catch` statement,
 * returning its return value and any errors
 *
 * @param {function} cb - Function attempted in `try`
 *
 * @param {errorHandler} [fb]
 *     Error handler called from `catch`;
 *     may optionally return a fallback value
 *
 * @returns {tcResult} [value, error]
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
export function tc<T = unknown>(
  cb: () => MaybePromise<T>,
  fb?: (e: unknown) => MaybePromise<T> | MaybePromise<void>
): MaybePromise<TcResult<T>> {
  try {
    const x = cb()
    return x instanceof Promise
      ? (async (): Promise<TcResult<T>> => {
          try {
            return [await x]
          } catch (e: unknown) {
            const y = await fb?.(e)
            return [y === void 0 ? undefined : y, e]
          }
        })()
      : [x]
  } catch (e: unknown) {
    return [fb?.(e) as T, e]
  }
}

export default tc
