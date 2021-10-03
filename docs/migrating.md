# Migrating

Follow only the instructions for your current version of `tc`:

| Version | Changes for all users | Changes for TypeScript only |
|---|---|---|
| [3.x](#migrating-from-3-x) | [**🚨 Breaking**](#usage) | [❓ Possibly breaking](#typescript) |
| [2.x](#migrating-from-2-x) | 🆗 No impacts | [**⚠️ Breaking**](#typescript-1) |
| [1.x](#migrating-from-1-x) | 🆗 No impacts | [**⚠️ Breaking**](#typescript-2) |

## Migrating from 3.x

### Usage

- **Breaking:** `tc` and `tcs` have been merged back into one function, with `tc` automatically handling `Promise`s as with versions prior to 3.x.
  - **To fix:** Replace all instance of `tcs` with `tc`.
- **Breaking:** `tc` is only provided as a const export, no longer a default export.
  - **To fix:** Replace `import { tc } from '@replygirl/tc'` with `import tc from '@replygirl/tc'`

### TypeScript

- **Possibly breaking:** `tc`'s return types are more precise to match runtime behavior. TypeScript may require you to handle some previously unhandled possibilities.

## Migrating from 2.x

### TypeScript

- Type parameters are properly inferred.
  - `tc`'s return type should be determined based on the callbacks you supply.
  - You can pass `T` and `U` to restrict the return values of your callbacks.
- **Breaking:** `TcCallback`, `TcErrorHandler`, `TcResult`, `TcReturn`, and `MaybePromise` are no longer exported.
  - **To fix:**
    - Replace `TcCallback<T>` with `Parameters<typeof tc<T>>[0]`
    - Replace `TcErrorHandler<T>` with `Parameters<typeof tc<T>>[1]`
    - Replace `TcResult<T>` with `AsyncReturnType<typeof tc<T>>` (requires [`type-fest`](https://github.com/sindresorhus/type-fest))
    - Replace `TcReturn<T>` with `ReturnType<typeof tc<T>>`
    - Replace `MaybePromise<T>` with `Promise<T> | T`

## Migrating from 1.x

### TypeScript

- Type parameters are properly inferred.
  - `tc`'s return type should be determined based on the callbacks you supply.
  - You can pass `T` and `U` to restrict the return values of your callbacks.
- **Breaking:** The `IsAsync` type parameter has been replaced. The second type parameter is now `U`, the return type of your `catch` callback, if you supplied one.
  - **To fix:** Remove the second type parameter from every call to `tc`.
- **Breaking:** `TcCallback`, `TcErrorHandler`, `TcResult`, `TcReturn`, and `MaybePromise` are no longer exported.
  - **To fix:**
    - Replace `TcCallback<T>` with `Parameters<typeof tc<T>>[0]`
    - Replace `TcErrorHandler<T>` with `Parameters<typeof tc<T>>[1]`
    - Replace `TcResult<T>` with `AsyncReturnType<typeof tc<T>>` (requires [`type-fest`](https://github.com/sindresorhus/type-fest))
    - Replace `TcReturn<T>` with `ReturnType<typeof tc<T>>`
    - Replace `MaybePromise<T>` with `Promise<T> | T`
