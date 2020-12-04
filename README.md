# `tc`

![node-current (scoped)](https://img.shields.io/node/v/@replygirl/tc) ![GitHub top language](https://img.shields.io/github/languages/top/replygirl/tc) [![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@replygirl/tc)](https://libraries.io/npm/@replygirl%2Ftc) [![Maintainability](https://api.codeclimate.com/v1/badges/5b5dd5c4f416e83e89ff/maintainability)](https://codeclimate.com/github/replygirl/tc/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/5b5dd5c4f416e83e89ff/test_coverage)](https://codeclimate.com/github/replygirl/tc/test_coverage) [![GitHub issues](https://img.shields.io/github/issues/replygirl/tc)](https://github.com/replygirl/tc/issues) [![GitHub pull requests](https://img.shields.io/github/issues-pr/replygirl/tc)](https://github.com/replygirl/tc/pulls)

destructurable, async-friendly `try...catch` wrapper function with support for error side effects and fallback values

## Installation

```bash
yarn add @replygirl/tc
```

## Usage

### Basic

```ts
import tc from '@replygirl/tc'

const [x] = await tc(async () => true)
console.info(x) // true

const [y, e] = await tc(async () => { throw new Error() })
console.info(y ?? e) // Error
```

#### Sync variant: `tcs` (no Promises or async/await)

```ts
import { tc } from '@replygirl/tc'

const [x] = tc(() => true)
console.info(x) // true

const [y, e] = tc(() => { throw new Error() })
console.info(y ?? e) // Error
```

### Custom error handling

```ts
tc(
  async() => { throw new Error() },
  async e => console.error(e)
) // Error
```

#### Returning fallback values in error handlers

```ts
const [y] = tc(
  async () => { throw new Error() },
  async e => false
)
console.info(y) // false
```

### TypeScript

If you need to override the inferred return type of your callback or error handler (let's say your error handler returns `void` instead of matching your callback), `tc` and `tcs` both accept `T` and `U` parameters that represent the unwrapped values of each:

```ts
declare function tc <T = unknown, U = T>(
  cb: () => Promise<T>,
  fb?: (e?: unknown) => Promise<U>
): Promise<[(T | U)?, unknown?]>

declare function tcs <T = unknown, U = T>(
  cb: () => T,
  fb?: (e?: unknown) => U
): [(T | U)?, unknown?]
```

## License

[ISC (c) 2020 replygirl](https://github.com/replygirl/tc/blob/main/LICENSE.md)
