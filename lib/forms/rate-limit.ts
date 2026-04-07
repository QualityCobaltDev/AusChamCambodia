type Bucket = { count: number; expiresAt: number };

const memoryStore = new Map<string, Bucket>();

/**
 * Simple in-memory token bucket for demo/staging.
 * Production strategy: replace with Redis or edge KV so limits are shared across instances.
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number,
) {
  const now = Date.now();
  const bucket = memoryStore.get(key);

  if (!bucket || bucket.expiresAt < now) {
    memoryStore.set(key, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (bucket.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterMs: bucket.expiresAt - now,
    };
  }

  bucket.count += 1;
  return { allowed: true, remaining: maxRequests - bucket.count };
}
