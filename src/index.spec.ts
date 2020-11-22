import assert from 'assert'

import tc from '.'

const eq = (a: any, b: any) => () => assert.deepStrictEqual(a, b)

describe('tc', async () => {
  it(
    'should return [x] when cb returns x',
    eq(tc<true>(() => true), [true])
  )
  it(
    'should return Promise<[x]> when async cb returns x',
    eq(await tc<true, true>(async () => true), [true])
  )
  it(
    'should return [undefined, e] when cb throws w/o fallback',
    eq(tc<any>(() => { throw new Error() }), [undefined, new Error()])
  )
  it(
    'should return [undefined, e] when async cb throws w/o fallback',
    eq(
      await tc<any, true>(async () => { throw new Error() }),
      [undefined, new Error()]
    )
  )
  it(
    'should return [fb, e] when cb throws w/ fallback',
    eq(
      tc<true>(() => { throw new Error() }, () => true),
      [true, new Error()]
    )
  )
  it(
    'should return Promise<[fb, e]> when async cb throws w/ fallback',
    eq(
      await tc<true, true>(async () => { throw new Error() }, async () => true),
      [true, new Error()]
    )
  )
  it(
    'should return Promise<[fb, e]> when async cb throws w/ async fallback',
    eq(
      await tc<true, true>(async () => { throw new Error() }, async () => true),
      [true, new Error()]
    )
  )
})
