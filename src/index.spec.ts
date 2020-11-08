import assert from 'assert'

import tc from '.'

const eq = (a: any, b: any) => () => assert.deepStrictEqual(a, b)

describe('tc', () => {
  it(
    'should return [x] when cb returns a x',
    eq(tc(() => true), [true])
  )
  it(
    'should return [undefined, e] when cb throws w/o fallback',
    eq(tc(() => { throw new Error() }), [undefined, new Error()] )
  )
  it(
    'should return [y, e] when cb throws w/ fallback',
    eq(tc(() => { throw new Error() }, () => true), [true, new Error()])
  )
})
