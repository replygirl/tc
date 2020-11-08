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
 *     // Error handling
 *
 *     tc(() => { throw new Error() }, e => console.error(e)) // Error
 *
 *
 *    // Fallback values
 *
 *     const [x] = tc(() => true, e => false)
 *     console.info(x) // true
 *
 *     const [y] = tc(() => { throw new Error() }, e => false)
 *     console.info(y) // false
 */
export function tc<X = unknown>(
  cb: () => X,
  fb?: (e: unknown) => any
): [X?, unknown?] {
  try { return [cb()] }
  catch (e: unknown) { return [fb?.(e), e]}
}

export default tc
