export type MaybePromise<T> = T | Promise<T>

/**
 * @callback TcCallback
 * @return {*}
 */
export type TcCallback<T> = () => MaybePromise<T>

/**
 * @callback TcErrorHandler
 * @param {unknown} e - An error
 * @return {*}
 */
export type TcErrorHandler<T> = (
  e: unknown
) => MaybePromise<T> | MaybePromise<void>

/**
 * @typedef TcResult
 * @type {array}
 * @property {any} [0] - The value returned by the callback or fallback
 * @property {unknown} [1] - The error thrown by the callback
 */
export type TcResult<T> = [T?, unknown?]

export type TcReturn<T> = MaybePromise<TcResult<T>>

const devoid = (x?: any | void): any => (x === void 0 ? undefined : x)

const processPromise = <T>(
  x: MaybePromise<T>,
  fb?: TcErrorHandler<T>
): TcReturn<T> => (x instanceof Promise ? tryToAwait<T>(x, fb) : [x])

const tryToAwait = async <T = unknown>(
  x: MaybePromise<T>,
  fb?: TcErrorHandler<T>
): Promise<TcResult<T>> => {
  try {
    return [await x]
  } catch (e: unknown) {
    return [devoid(await fb?.(e)), e]
  }
}

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
export function tc<T = unknown>(
  cb: TcCallback<T>,
  fb?: TcErrorHandler<T>
): TcReturn<T> {
  try {
    return processPromise<T>(cb())
  } catch (e: unknown) {
    return [devoid(fb?.(e)), e]
  }
}

export default tc
