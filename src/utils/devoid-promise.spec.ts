import { deepStrictEqual as eq } from 'assert'

import devoidPromise from './devoid-promise'

import type { Suite } from 'mocha'

const createSuite = (
  name: string,
  fn: typeof devoidPromise
): Suite =>
  describe(name, () => {
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

createSuite('utils/devoidPromise', devoidPromise)

export default createSuite
