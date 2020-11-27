# `tc`

![node-current (scoped)](https://img.shields.io/node/v/@replygirl/tc) ![GitHub top language](https://img.shields.io/github/languages/top/replygirl/tc) [![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@replygirl/tc)](https://libraries.io/npm/@replygirl%2Ftc) [![Maintainability](https://api.codeclimate.com/v1/badges/5b5dd5c4f416e83e89ff/maintainability)](https://codeclimate.com/github/replygirl/tc/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/5b5dd5c4f416e83e89ff/test_coverage)](https://codeclimate.com/github/replygirl/tc/test_coverage) [![GitHub issues](https://img.shields.io/github/issues/replygirl/tc)](https://github.com/replygirl/tc/issues) [![GitHub pull requests](https://img.shields.io/github/issues-pr/replygirl/tc)](https://github.com/replygirl/tc/pulls)

destructurable, async-friendly `try...catch` wrapper function with support for error side effects and fallback values

## Installation

```bash
yarn add @replygirl/tc
```

## Usage

### The basics

```ts
import tc from '@replygirl/tc'

const [x, xe] = tc(() => true)
console.info(x ?? xe) // true

const [y, ye] = tc(() => { throw new Error() })
console.info(y ?? ye) // Error
```

#### With `async`/`await`

```ts
const [x, xe] = await tc(async () => true)
console.info(x ?? xe) // true

const [y, ye] = await tc(async () => { throw new Error() })
console.info(y ?? ye) // Error
```

### Custom error handling

```ts
tc(() => { throw new Error() }, e => console.error(e)) // Error
```

#### Returning fallback values in error handlers

```ts
const [x] = tc(() => true, e => false)
console.info(x) // true

const [y] = tc(() => { throw new Error() }, e => false)
console.info(y) // false
```

### TypeScript

```ts
const [x, xe] = tc<boolean>(() => true)
console.info(x ?? xe) // true

const [y, ye] = tc<boolean>(() => { throw new Error() })
console.info(y ?? ye) // Error

const [z, ze] = await tc<boolean>(async () => true)
console.info(z ?? ze) // true
```

## License

[ISC (c) 2020 replygirl](https://github.com/replygirl/tc/blob/main/LICENSE.md)

## Footnotes

<sup>1</sup> I'm very open to contributions that let `tc` infer the callback's return types
