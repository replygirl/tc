import { deepStrictEqual as eq } from 'assert'

import devoidPromise from './devoid-promise'

describe('devoidPromise', () => {
  it('when x is Promise<void>, returns Promise<undefined>', async () =>
    eq(
      await devoidPromise<boolean>(
        new Promise<void>(r => r())
      ),
      undefined
    ))
  it('when x is Promise<any>, returns Promise<any>', async () =>
    eq(
      await devoidPromise<boolean>(new Promise(r => r(true))),
      true
    ))
})
