import { deepStrictEqual as eq } from 'assert'

import _default, { tc, tcs } from '.'

describe('_default', () => {
  it('when cb returns x, returns Promise<[x]>', async () =>
    eq(await _default(async () => true), [true]))
  it('when async cb throws w/o fallback, returns [undefined, e]', async () =>
    eq(
      await _default(async () => {
        throw new Error()
      }),
      [undefined, new Error()]
    ))
  it('when cb throws w/ fallback, returns Promise<[fb, e]>', async () =>
    eq(
      await _default(
        async () => {
          throw new Error()
        },
        async () => true
      ),
      [true, new Error()]
    ))
})

describe('tc', () => {
  it('when cb returns x, returns Promise<[x]>', async () =>
    eq(await tc(async () => true), [true]))
  it('when async cb throws w/o fallback, returns [undefined, e]', async () =>
    eq(
      await tc(async () => {
        throw new Error()
      }),
      [undefined, new Error()]
    ))
  it('when cb throws w/ fallback, returns Promise<[fb, e]>', async () =>
    eq(
      await tc(
        async () => {
          throw new Error()
        },
        async () => true
      ),
      [true, new Error()]
    ))
})

describe('tcs', () => {
  it('when cb returns x, returns [x]', () =>
    eq(
      tcs(() => true),
      [true]
    ))
  it('when cb throws w/o fallback, returns [undefined, e]', () =>
    eq(
      tcs(() => {
        throw new Error()
      }),
      [undefined, new Error()]
    ))
  it('when cb throws w/ fallback, returns [fb, e]', () =>
    eq(
      tcs(
        () => {
          throw new Error()
        },
        () => true
      ),
      [true, new Error()]
    ))
})
