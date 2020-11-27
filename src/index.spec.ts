import assert from 'assert'

import tc from '.'

const eq = (a: any, b: any) => () => assert.deepStrictEqual(a, b)

describe('tc', async () => {
  it(
    'should return [x] when sync cb returns x',
    eq(
      tc<boolean>(() => true),
      [true]
    )
  )
  it(
    'should return [undefined, e] when sync cb throws w/o fallback',
    eq(
      tc<any>(() => {
        throw new Error()
      }),
      [undefined, new Error()]
    )
  )
  it(
    'should return [fb, e] when sync cb throws w/ sync fallback',
    eq(
      tc<boolean>(
        () => {
          throw new Error()
        },
        () => true
      ),
      [true, new Error()]
    )
  )
  it(
    'should return [Promise<fb>, e] when sync cb throws w/ async fallback',
    eq(
      tc<boolean>(
        () => {
          throw new Error()
        },
        async () => true
      ),
      [(async () => true)(), new Error()]
    )
  )
  it(
    'should return Promise<[x]> when async cb returns x',
    eq(await tc<boolean>(async () => true), [true])
  )
  it(
    'should return [undefined, e] when async cb throws w/o fallback',
    eq(
      await tc<boolean>(async () => {
        throw new Error()
      }),
      [undefined, new Error()]
    )
  )
  it(
    'should return Promise<[fb, e]> when async cb throws w/ sync fallback',
    eq(
      await tc<boolean>(
        async () => {
          throw new Error()
        },
        () => true
      ),
      [true, new Error()]
    )
  )
  it(
    'should return Promise<[fb, e]> when async cb throws w/ async fallback',
    eq(
      await tc<boolean>(
        async () => {
          throw new Error()
        },
        async () => true
      ),
      [true, new Error()]
    )
  )
})
