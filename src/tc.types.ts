import { Devoided } from './utils/devoid.types'

import type { MaybePromise } from './index.types'
/**
 * @callback TcCallback
 * @return {*}
 */
export type TcCallback<T = unknown> = () => MaybePromise<T>

/**
 * @callback TcErrorHandler
 * @param {unknown} e - An error
 * @return {*}
 */
export type TcErrorHandler<T = unknown> = (
  e: unknown
) => MaybePromise<T> | MaybePromise<void>

/**
 * @typedef TcResult
 * @type {array}
 * @property {any} [0] - The value returned by the callback or fallback
 * @property {unknown} [1] - The error thrown by the callback
 */
export type TcResult<T = unknown> = [
  MaybePromise<Devoided<T>>,
  unknown?
]

export type TcReturn<T = unknown> = MaybePromise<TcResult<T>>
