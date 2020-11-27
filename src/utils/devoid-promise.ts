import type { Devoided } from './devoid.types'

export default async function <T = unknown>(
  x?: Promise<T | void>
): Promise<Devoided<T>> {
  const y = await x
  return y === void 0 ? undefined : y
}
