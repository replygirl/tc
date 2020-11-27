import { deepStrictEqual as eq } from 'assert'

import tc from './tc'

describe('tc', () => {
  it('when sync cb returns x, returns [x]', () =>
    eq(
      tc<boolean>(() => true),
      [true]
    ))
  it('when sync cb throws w/o fallback, returns [undefined, e]', () =>
    eq(
      tc<any>(() => {
        throw new Error()
      }),
      [undefined, new Error()]
    ))
  it('when sync cb throws w/ sync fallback, returns [fb, e]', () =>
    eq(
      tc<boolean>(
        () => {
          throw new Error()
        },
        () => true
      ),
      [true, new Error()]
    ))
  it('when sync cb throws w/ async fallback, returns [Promise<fb>, e]', () =>
    eq(
      tc<boolean>(
        () => {
          throw new Error()
        },
        async () => true
      ),
      [(async () => true)(), new Error()]
    ))
  it('when async cb returns x, returns Promise<[x]>', async () =>
    eq(await tc<boolean>(async () => true), [true]))
  it('when async cb throws w/o fallback, returns [undefined, e]', async () =>
    eq(
      await tc<boolean>(async () => {
        throw new Error()
      }),
      [undefined, new Error()]
    ))
  it('when async cb throws w/ sync fallback, returns Promise<[fb, e]> ', async () =>
    eq(
      await tc<boolean>(
        async () => {
          throw new Error()
        },
        () => true
      ),
      [true, new Error()]
    ))
  it('when async cb throws w/ async fallback, returns Promise<[fb, e]>', async () =>
    eq(
      await tc<boolean>(
        async () => {
          throw new Error()
        },
        async () => true
      ),
      [true, new Error()]
    ))
})
