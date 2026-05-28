import { Redis as UpstashRedis } from '@upstash/redis';
import { createClient } from 'redis';

interface CacheClient {
  get: (key: string) => Promise<string | null>;
  set: (key: string, value: string, ttlSeconds?: number) => Promise<void>;
  del: (key: string) => Promise<void>;
  type: 'upstash' | 'local-redis' | 'memory';
  rawClient?: any;
}

class MemoryCache implements CacheClient {
  private store = new Map<string, { value: string; expiresAt: number | null }>();
  public type: 'upstash' | 'local-redis' | 'memory' = 'memory';

  async get(key: string): Promise<string | null> {
    const item = this.store.get(key);
    if (!item) return null;
    if (item.expiresAt && Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return item.value;
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    const expiresAt = ttlSeconds ? Date.now() + ttlSeconds * 1000 : null;
    this.store.set(key, { value, expiresAt });
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }
}

let cache: CacheClient;

const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redisUrl = process.env.REDIS_URL;

if (upstashUrl && upstashToken) {
  const client = new UpstashRedis({
    url: upstashUrl,
    token: upstashToken,
  });

  cache = {
    type: 'upstash',
    rawClient: client,
    get: async (key) => client.get<string>(key),
    set: async (key, value, ttl) => {
      if (ttl) {
        await client.set(key, value, { ex: ttl });
      } else {
        await client.set(key, value);
      }
    },
    del: async (key) => {
      await client.del(key);
    },
  };
  console.log('🔌 Connected to Upstash Redis cache');
} else if (redisUrl) {
  const client = createClient({ url: redisUrl });
  client.connect().catch((err) => {
    console.error('❌ Failed to connect to local Redis, falling back to In-Memory cache:', err.message);
    cache = new MemoryCache();
  });

  cache = {
    type: 'local-redis',
    rawClient: client,
    get: async (key) => client.get(key),
    set: async (key, value, ttl) => {
      if (ttl) {
        await client.set(key, value, { EX: ttl });
      } else {
        await client.set(key, value);
      }
    },
    del: async (key) => {
      await client.del(key);
    },
  };
  console.log('🔌 Connected to local Redis cache');
} else {
  cache = new MemoryCache();
  console.log('ℹ️ No Redis configuration found. Using In-Memory cache fallback.');
}

export { cache };
