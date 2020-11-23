/**
 * @callback errorHandler
 * @param {unknown} e - An error
 * @return {any}
 */

/**
 * @typedef returnArray
 * @type {array}
 * @property {any} [0] - The value returned by the callback or fallback
 * @property {unknown} [1] - The error thrown by the callback
 */
export type TcResult<
  X = unknown,
  IsAsync extends boolean = false
> = IsAsync extends true ? Promise<[X?, unknown?]> : [X?, unknown?]

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
 * @returns {returnArray} [value, error]
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
export function tc<X = unknown, IsAsync extends boolean = false>(
  cb: () => IsAsync extends true ? Promise<X> : X,
  fb?: (e: unknown) => IsAsync extends true ? Promise<X> : X
): TcResult<X, IsAsync> {
  try {
    const x = cb()
    return x instanceof Promise
      ? (new Promise<[X?, unknown?]>(async resolve => {
          try {
            resolve([await x])
          } catch (e: unknown) {
            resolve(([
              await (fb?.(e) as Promise<X | undefined>),
              e
            ] as unknown) as TcResult<X, IsAsync>)
          }
        }) as TcResult<X, IsAsync>)
      : (([x] as unknown) as TcResult<X, IsAsync>)
  } catch (e: unknown) {
    return ([fb?.(e), e] as unknown) as TcResult<X, IsAsync>
  }
}

export default tc
