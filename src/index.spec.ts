import { deepStrictEqual as eq } from 'assert'

import _default, { tc } from '.'

const fn = (f: typeof tc) => () => {
  describe('when `t` returns a promise', () => {
    describe('and `t` succeeds', () => {
      it('returns Promise<[true, undefined]>', async () =>
        eq(await f(async () => true), [true, undefined]))
    })
    describe("and `t` throws `'Failed from `t`'`", () => {
      const t = async () => {
        throw new Error('Failed from `t`')
      }
      describe('and `c` is undefined', () =>
        it("returns Promise<[undefined, new Error('Failed from `t`')]>", async () =>
          eq(await f(t), [undefined, new Error('Failed from `t`')])))
      describe('and `c` returns a promise', () => {
        describe('and `c` succeeds', () =>
          it("returns Promise<[false, new Error('Failed from `t`')]>", async () =>
            eq(await f(t, async () => false), [
              false,
              new Error('Failed from `t`'),
            ])))
        describe("and `c` throws `'Failed from `c`'`", () =>
          it("returns Promise<[undefined, new Error('Failed from `c`')]>", async () =>
            eq(
              await f(t, async () => {
                throw new Error('Failed from `c`')
              }),
              [undefined, new Error('Failed from `c`')]
            )))
      })
      describe("and `c` doesn't return a promise", () => {
        describe('and `c` succeeds', () =>
          it("returns Promise<[false, new Error('Failed from `t`')]>", async () =>
            eq(await f(t, () => false), [false, new Error('Failed from `t`')])))
        describe("and `c` throws `'Failed from `c`'`", () =>
          it("returns Promise<[undefined, new Error('Failed from `c`')]>", async () =>
            eq(
              await f(t, () => {
                throw new Error('Failed from `c`')
              }),
              [undefined, new Error('Failed from `c`')]
            )))
      })
    })
  })
  describe("when `t` doesn't return a promise", () => {
    describe('and `t` succeeds', () =>
      it('returns [true, undefined]', () =>
        eq(
          f(() => true),
          [true, undefined]
        )))
    describe("and `t` throws `'Failed from `t`'`", () => {
      const t = () => {
        throw new Error('Failed from `t`')
      }
      describe('and `c` is undefined', () =>
        it("returns [undefined, new Error('Failed from `t`')]", () =>
          eq(f(t), [undefined, new Error('Failed from `t`')])))
      describe('and `c` returns a promise', () => {
        describe('and `c` succeeds', () =>
          it("returns Promise<[false, new Error('Failed from `t`')]>", async () =>
            eq(await f(t, async () => false), [
              false,
              new Error('Failed from `t`'),
            ])))
        describe("and `c` throws `'Failed from `c`'`", () =>
          it("returns Promise<[undefined, new Error('Failed from `c`')]>", async () =>
            eq(
              await f(t, async () => {
                throw new Error('Failed from `c`')
              }),
              [undefined, new Error('Failed from `c`')]
            )))
      })
      describe("and `c` doesn't return a promise", () => {
        describe('and `c` succeeds', () =>
          it("returns [false, new Error('Failed from `t`')]", () =>
            eq(
              f(t, () => false),
              [false, new Error('Failed from `t`')]
            )))
        describe("and `c` throws `'Failed from `c`'`", () =>
          it("returns [undefined, new Error('Failed from `c`')]", () =>
            eq(
              f(t, () => {
                throw new Error('Failed from `c`')
              }),
              [undefined, new Error('Failed from `c`')]
            )))
      })
    })
  })
}

describe('for a function `t` resolving to `true` and a function `c` resolving to `false`', () => {
  describe('the default export', fn(_default))
  describe('the `tc` const export', fn(tc))
})
