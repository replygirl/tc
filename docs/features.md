# Features

## Error handling & fallback values

### Basic: Destructuring assignment

```ts{1}
const [x = false, e] = tc(() => {
  throw new Error()
})
if (e) console.error(e)
```

### Advanced: Error handler
```ts{3–6}
const [x] = tc(
  () => { throw new Error() },
  e => {
    console.error(e)
    return false
  }
)
```

## Auto async

`tc` will accept any combination of synchronous or asynchronous callbacks.

```ts
/**
 * These both return a result
 */
tc(() => {}, () => {})
await tc(() => {}, () => {})

/**
 * This returns a result or a Promise
 * The `await` keyword will work either way
 */
await tc(() => {}, async () => {})

/**
 * These always return a Promise
 */
await tc(async () => {}, () => {})
await tc(async () => {}, async () => {})
```
