# `tc`

destructurable, async-friendly `try...catch` wrapper function

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

<sup>1</sup> I'm welcome to contributions that let `tc` infer the callback's return types!
