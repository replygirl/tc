export type TcResult<T = unknown> = [T?, unknown?]

/**
 * Execute a callback within a `try...catch` statement,
 * returning its return value and any errors
 *
 * @param cb Function attempted in `try`
 *
 * @param fb
 *     Error handler called from `catch`;
 *     may optionally return a fallback value
 *
 * @returns Promise<[value, error]>
 *
 * @example
 *
 *     // Basic usage
 *
 *     const [x] = await tc(async () => true)
 *     console.info(x) // true
 *
 *     const [y, e] = await tc(async () => { throw new Error() })
 *     console.info(y ?? e) // Error
 *
 *
 *     // Error handling
 *
 *     await tc(
 *       async () => { throw new Error() },
 *       async e => console.error(e)
 *     ) // Error
 *
 *
 *     // Fallback values
 *
 *     const [y] = await tc(
 *       async () => { throw new Error() },
 *       async e => false
 *     )
 *     console.info(y) // false
 */
export async function tc<T = unknown, U = T>(
  cb: () => Promise<T>,
  fb?: (e?: unknown) => Promise<U>
): Promise<[(T | U)?, unknown?]> {
  try {
    return [await cb()]
  } catch (e: unknown) {
    return [await fb?.(e), e]
  }
}

/**
 * Execute a callback within a `try...catch` statement,
 * returning its return value and any errors
 *
 * @param cb Function attempted in `try`
 *
 * @param fb
 *     Error handler called from `catch`;
 *     may optionally return a fallback value
 *
 * @returns [value, error]
 *
 * @example
 *
 *     // Basic usage
 *
 *     const [x] = tcs(() => true)
 *     console.info(x ?? xe) // true
 *
 *     const [y, ye] = tcs(() => { throw new Error() })
 *     console.info(y ?? ye) // Error
 *
 *
 *     // Error handling
 *
 *     tc(
 *       () => { throw new Error() },
 *       e => console.error(e)
 *     ) // Error
 *
 *
 *     // Fallback values
 *
 *     const [y] = tc(
 *       () => { throw new Error() },
 *       e => false
 *     )
 *     console.info(y) // false
 */
export function tcs<T = unknown, U = T>(
  cb: () => T,
  fb?: (e?: unknown) => U
): [(T | U)?, unknown?] {
  try {
    return [cb()]
  } catch (e: unknown) {
    return [fb?.(e), e]
  }
}

export default tc
