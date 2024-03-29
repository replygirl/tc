/* eslint-disable complexity */
type MaybePromise<T> = Promise<T> | T

function tc<T = unknown, U = T>(
  t: () => T extends Promise<any> ? never : T
): [T, undefined] | [undefined, unknown]
function tc<T = unknown, U = T>(
  t: () => T extends Promise<any> ? never : T,
  c: (e: unknown) => U extends Promise<any> ? never : U
): [T, undefined] | [U | undefined, unknown]
function tc<T = unknown, U = T>(
  t: () => T extends Promise<any> ? never : T,
  c: (e: unknown) => Promise<U extends Promise<any> ? never : U>
): [T, undefined] | Promise<[U | undefined, unknown]>
function tc<T = unknown, U = T>(
  t: () => Promise<T extends Promise<any> ? never : T>
): Promise<[T, undefined] | [undefined, unknown]>
function tc<T = unknown, U = T>(
  t: () => Promise<T extends Promise<any> ? never : T>,
  c: (e: unknown) => U extends Promise<any> ? never : U
): Promise<[T, undefined] | [U | undefined, unknown]>
function tc<T = unknown, U = T>(
  t: () => Promise<T extends Promise<any> ? never : T>,
  c: (e: unknown) => Promise<U extends Promise<any> ? never : U>
): Promise<[T, undefined] | [U | undefined, unknown]>
function tc<T = unknown, U = T>(
  t: () => MaybePromise<T extends Promise<any> ? never : T>,
  c?: (e: unknown) => MaybePromise<U extends Promise<any> ? never : U>
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
