# Types

`tc` is written in TypeScript, with fully automatic type checking.

## Parameters

```ts{2-3}
function tc<T = unknown, U = T>(
  t: () => MaybePromise<T>, // try
  c?: (e: unknown) => MaybePromise<U> // catch
): MaybePromise<[T, undefined] | [U | undefined, unknown]>
```

## Return values

The unwrapped (awaited) return value of `tc` will always be an array of two items:

1. **`T`** (if `t` succeeds), **`U`** (if `c` succeeds), or **`undefined`**
2. **`undefined`** (if `t` succeeds) or **`unknown`**
    - If `t` and `c` both fail, the error will be from `c`

## Overload signatures

`tc` will determine its return value based on the return types of your `t` and `c` callbacks. You shouldn't need to pass in type arguments for accurate type checking.

```ts
function tc<T = unknown, U = T>(
  t: () => T,
  c?: (e: unknown) => U
): [T, undefined] | [U | undefined, unknown]
function tc<T = unknown, U = T>(
  t: () => T,
  c?: (e: unknown) => Promise<U>
): [T, undefined] | Promise<[U | undefined, unknown]>
function tc<T = unknown, U = T>(
  t: () => Promise<T>,
  c?: (e: unknown) => MaybePromise<U>
): Promise<[T, undefined] | [U | undefined, unknown]>
```
