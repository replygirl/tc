import { deepStrictEqual as eq } from 'assert'

import processPromise from './process-promise'

import type { Suite } from 'mocha'

const createSuite = (
  name: string,
  fn: typeof processPromise
): Suite =>
  describe(name, () => {
    it('when x is void, returns [undefined]', () =>
      eq(fn<void>(void 0), [undefined]))
    it('when x is any, returns [x]', () =>
      eq(fn<boolean>(true), [true]))
    it('when x is Promise<void>, returns Promise<[undefined]>', async () =>
      eq(await fn<void>(new Promise(r => r())), [undefined]))
    it('when x is Promise<any>, returns Promise<[any]>', async () =>
      eq(await fn<boolean>(new Promise(r => r(true))), [true]))
    it('when x is Promise<any> and rejects w/o fallback, returns Promise<[undefined, e]> ', async () =>
      eq(
        await fn<boolean>(
          new Promise((_, r) => r(new Error()))
        ),
        [undefined, new Error()]
      ))
    it('when x is Promise<any> and rejects w/ sync fallback, returns Promise<[y, e]> ', async () =>
      eq(
        await fn<boolean>(
          new Promise((_, r) => r(new Error())),
          () => false
        ),
        [false, new Error()]
      ))
    it('when x is Promise<any> and rejects w/ async fallback, returns Promise<[y, e]> ', async () =>
      eq(
        await fn<boolean>(
          new Promise((_, r) => r(new Error())),
          async () => false
        ),
        [false, new Error()]
      ))
    it('when x is Promise<any> and throws w/o fallback, returns Promise<[undefined, e]>', async () =>
      eq(
        await fn<boolean>(
          new Promise(() => {
            throw new Error()
          })
        ),
        [undefined, new Error()]
      ))
    it('when x is Promise<any> and throw w/ sync fallback, returns Promise<[y, e]> ', async () =>
      eq(
        await fn<boolean>(
          new Promise(() => {
            throw new Error()
          }),
          () => false
        ),
        [false, new Error()]
      ))
    it('when x is Promise<any> and throw w/ async fallback, returns Promise<[y, e]> ', async () =>
      eq(
        await fn<boolean>(
          new Promise(() => {
            throw new Error()
          }),
          async () => false
        ),
        [false, new Error()]
      ))
  })

createSuite('utils/processPromise', processPromise)

export default createSuite
