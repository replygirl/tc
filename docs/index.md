# Overview

`tc` is a destructurable, async-friendly `try...catch` wrapper function with support for error side effects and fallback values.

## `tc` vs. `try...catch`

### Basic `try`

```ts{7}
// with try...catch
try {
  const a = myFunction()
} catch {}

// with tc
const [b] = tc(myFunction)
```

### Async `try...catch`

```ts{10}
// with try...catch
let a
try {
  a = await myFunction()
} catch (e) {
  a = myErrorHandler(e)
}

// with tc
const [b] = await tc(myFunction, myErrorHandler)
```
