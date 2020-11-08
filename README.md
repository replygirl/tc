# `tc`

A wrapper function for `try...catch` statements

## Installation

```bash
yarn add @replygirl/tc
```

## Usage

```ts
import tc from '@replygirl/tc'

const [x, xe] = tc(() => true)
console.info(x ?? xe) // true

const [y, ye] = tc(() => { throw new Error() })
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

## License

[ISC (c) 2020 replygirl](https://github.com/replygirl/tc/blob/main/LICENSE.md)
