import { deepStrictEqual as eq } from 'assert'

import devoid from './devoid'

describe('devoid', () => {
  it('when x is void, returns undefined', () =>
    eq(devoid(void 0), undefined))
  it('when x is any, returns x', () =>
    eq(devoid<boolean>(true), true))
  it('when x is Promise<void>, returns Promise<undefined>', async () =>
    eq(
      await devoid<boolean>(
        new Promise<void>(r => r())
      ),
      undefined
    ))
  it('when x is Promise<any>, returns Promise<any>', async () =>
    eq(await devoid<boolean>(new Promise(r => r(true))), true))
})
