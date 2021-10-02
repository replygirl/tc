/* eslint-disable complexity */
type MaybePromise<T> = Promise<T> | T

function tc<T = unknown, U = T>(
  t: () => T,
  c?: (e: unknown) => U
): [T, undefined] | [U | undefined, unknown]
function tc<T = unknown, U = T>(
  t: () => T,
  c?: (e: unknown) => Promise<U>
): [T, undefined] | Promise<[U | undefined, unknown]>
function tc<T = unknown, U = T>(
  t: () => Promise<T>,
  c?: (e: unknown) => MaybePromise<U>
): Promise<[T, undefined] | [U | undefined, unknown]>
function tc<T = unknown, U = T>(
  t: () => MaybePromise<T>,
  c?: (e: unknown) => MaybePromise<U>
): MaybePromise<[T, undefined] | [U | undefined, unknown]> {
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
