/**
 * Execute a callback within a `try...catch` statement,
 * returning its return value and any errors
 *
 * @param t Function attempted in `try`
 *
 * @param c
 *     Error handler called from `catch`;
 *     may optionally return a fallback value
 *
 * @returns
 *     If either `t` or `c` returns a Promise, returns Promise<[T, error]>;
 *
 *     If neither `t` nor `c` returns a Promise, returns [T, error]
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
export function tc<T = unknown, U = T>(
  t: () => T,
  c?: (e: unknown) => U
): [(T | U)?, unknown?]
export function tc<T = unknown, U = T>(
  t: () => T,
  c?: (e: unknown) => Promise<U>
): Promise<[(T | U)?, unknown?]>
export function tc<T = unknown, U = T>(
  t: () => Promise<T>,
  c?: (e: unknown) => Promise<U> | U
): Promise<[(T | U)?, unknown?]>
// eslint-disable-next-line complexity
export function tc<T = unknown, U = T>(
  t: () => Promise<T> | T,
  c?: (e: unknown) => Promise<U> | U
): Promise<[(T | U)?, unknown?]> | [(T | U)?, unknown?] {
  try {
    const tv = t()

    return tv instanceof Promise
      ? new Promise(resolve =>
          tv
            .then(x => resolve([x, undefined]))
            .catch(e => {
              try {
                const cv = c?.(e)

                if (cv instanceof Promise)
                  cv.then(x => resolve([x, e])).catch(e =>
                    resolve([undefined, e])
                  )
                else resolve([cv, e])
              } catch (e) {
                resolve([undefined, e])
              }
            })
        )
      : [tv, undefined]
  } catch (e) {
    try {
      const cv = c?.(e)

      return cv instanceof Promise
        ? new Promise(resolve =>
            cv.then(x => resolve([x, e])).catch(e => resolve([undefined, e]))
          )
        : [cv, e]
    } catch (e) {
      return [undefined, e]
    }
  }
}

export default tc
