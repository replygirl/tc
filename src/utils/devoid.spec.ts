import { deepStrictEqual as eq } from 'assert'

import devoid from './devoid'

import type { Suite } from 'mocha'

const createSuite = (name: string, fn: typeof devoid): Suite =>
  describe(name, () => {
    it('when x is void, returns undefined', () =>
      eq(fn(void 0), undefined))
    it('when x is any, returns x', () =>
      eq(fn<boolean>(true), true))
    it('when x is Promise<void>, returns Promise<undefined>', async () =>
      eq(
        await fn<boolean>(
          new Promise<void>(r => r())
        ),
        undefined
      ))
    it('when x is Promise<any>, returns Promise<any>', async () =>
      eq(await fn<boolean>(new Promise(r => r(true))), true))
  })

createSuite('utils/devoid', devoid)

export default createSuite
