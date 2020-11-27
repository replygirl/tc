import { deepStrictEqual as eq } from 'assert'

import processPromise from './process-promise'

describe('processPromise', () => {
  it('when x is void, returns [undefined]', () =>
    eq(processPromise<void>(void 0), [undefined]))
  it('when x is any, returns [x]', () =>
    eq(processPromise<boolean>(true), [true]))
  it('when x is Promise<void>, returns Promise<[undefined]>', async () =>
    eq(await processPromise<void>(new Promise(r => r())), [
      undefined
    ]))
  it('when x is Promise<any>, returns Promise<[any]>', async () =>
    eq(
      await processPromise<boolean>(new Promise(r => r(true))),
      [true]
    ))
  it('when x is Promise<any> and rejects w/o fallback, returns Promise<[undefined, e]> ', async () =>
    eq(
      await processPromise<boolean>(
        new Promise((_, r) => r(new Error()))
      ),
      [undefined, new Error()]
    ))
  it('when x is Promise<any> and rejects w/ sync fallback, returns Promise<[y, e]> ', async () =>
    eq(
      await processPromise<boolean>(
        new Promise((_, r) => r(new Error())),
        () => false
      ),
      [false, new Error()]
    ))
  it('when x is Promise<any> and rejects w/ async fallback, returns Promise<[y, e]> ', async () =>
    eq(
      await processPromise<boolean>(
        new Promise((_, r) => r(new Error())),
        async () => false
      ),
      [false, new Error()]
    ))
  it('when x is Promise<any> and throws w/o fallback, returns Promise<[undefined, e]>', async () =>
    eq(
      await processPromise<boolean>(
        new Promise(() => {
          throw new Error()
        })
      ),
      [undefined, new Error()]
    ))
  it('when x is Promise<any> and throw w/ sync fallback, returns Promise<[y, e]> ', async () =>
    eq(
      await processPromise<boolean>(
        new Promise(() => {
          throw new Error()
        }),
        () => false
      ),
      [false, new Error()]
    ))
  it('when x is Promise<any> and throw w/ async fallback, returns Promise<[y, e]> ', async () =>
    eq(
      await processPromise<boolean>(
        new Promise(() => {
          throw new Error()
        }),
        async () => false
      ),
      [false, new Error()]
    ))
})
