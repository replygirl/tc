import { Devoided } from './utils/devoid.types'

import type { MaybePromise } from './index.types'
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
export type TcResult<T> = [MaybePromise<Devoided<T>>, unknown?]

export type TcReturn<T> = MaybePromise<TcResult<T>>
