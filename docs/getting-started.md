# Getting started

## Installation

```bash
yarn add @replygirl/tc
```

## Basic usage

```ts
import tc from '@replygirl/tc'

const [x] = tc(() => true)
console.info(x) // true

const [y, e] = tc(() => { throw new Error() })
console.info(y ?? e) // Error
```
