# `tc`

![node-current (scoped)](https://img.shields.io/node/v/@replygirl/tc) ![GitHub top language](https://img.shields.io/github/languages/top/replygirl/tc) [![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@replygirl/tc)](https://libraries.io/npm/@replygirl%2Ftc) [![Maintainability](https://api.codeclimate.com/v1/badges/5b5dd5c4f416e83e89ff/maintainability)](https://codeclimate.com/github/replygirl/tc/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/5b5dd5c4f416e83e89ff/test_coverage)](https://codeclimate.com/github/replygirl/tc/test_coverage) [![GitHub issues](https://img.shields.io/github/issues/replygirl/tc)](https://github.com/replygirl/tc/issues) [![GitHub pull requests](https://img.shields.io/github/issues-pr/replygirl/tc)](https://github.com/replygirl/tc/pulls)

destructurable, async-friendly `try...catch` wrapper function with support for error side effects and fallback values

## Installation & usage

See the [docs](https://tc.replygirl.club) for full details.

```ts
import tc from '@replygirl/tc'

// get the return value and error of a try callback
const [x, e] = tc(() => { /* ... */ })

// or put complex error handling in a catch callback
const [y] = await tc(doSomething, async e => {
  await reportError(e)
  return getFallbackValue(e)
})

// reuse your error handling by defining your own wrapper
const tce = (t, c) => tc(t, async e => {
  await reportError(e)
  return c(e)
})
const [z] = tce(doSomething, getFallbackValue)
```

---

[ISC License | Copyright © 2020–present replygirl](https://github.com/replygirl/tc/blob/main/LICENSE.md)
