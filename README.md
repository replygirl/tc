# `tc`

![node-current (scoped)](https://img.shields.io/node/v/@replygirl/tc?style=flat-square) ![GitHub top language](https://img.shields.io/github/languages/top/replygirl/tc?style=flat-square) [![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@replygirl/tc?style=flat-square)](https://libraries.io/npm/@replygirl%2Ftc) ![Code Climate coverage](https://img.shields.io/codeclimate/coverage/replygirl/tc?style=flat-square) [![GitHub issues](https://img.shields.io/github/issues/replygirl/tc?style=flat-square)](https://github.com/replygirl/tc/issues) [![GitHub pull requests](https://img.shields.io/github/issues-pr/replygirl/tc?style=flat-square)](https://github.com/replygirl/tc/pulls)

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

`tc` accepts the following type parameters:

- `X`: Return type of the callback (and error handler, if it returns a fallback value)
- `IsAsync` (optional `boolean`, default: `false`): Whether the callback and error handler return a `Promise`.<sup>1</sup>

```ts
const [x, xe] = tc<true>(() => true)
console.info(x ?? xe) // true

const [y, ye] = tc<true>(() => { throw new Error() })
console.info(y ?? ye) // Error

const [z, ze] = await tc<true, true>(async () => true)
console.info(z ?? ze) // true
```

## License

[ISC (c) 2020 replygirl](https://github.com/replygirl/tc/blob/main/LICENSE.md)

## Footnotes

<sup>1</sup> I'm very open to contributions that let `tc` infer the callback's return types
