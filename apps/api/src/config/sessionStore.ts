import session from 'express-session';
import { Redis as UpstashRedis } from '@upstash/redis';

export class UpstashSessionStore extends session.Store {
  private client: UpstashRedis;
  private prefix: string;
  private ttl: number; // seconds

  constructor(options: {
    client: UpstashRedis;
    prefix?: string;
    ttl?: number;
  }) {
    super();
    this.client = options.client;
    this.prefix = options.prefix || 'sess:';
    this.ttl = options.ttl || 86400 * 30;
  }

  private key(sid: string): string {
    return `${this.prefix}${sid}`;
  }

  get(sid: string, callback: (err?: any, session?: session.SessionData | null) => void): void {
    this.client
      .get<string>(this.key(sid))
      .then((data) => {
        if (!data) return callback(null, null);
        try {
          const parsed = typeof data === 'string' ? JSON.parse(data) : data;
          callback(null, parsed);
        } catch {
          callback(null, null);
        }
      })
      .catch((err) => callback(err));
  }

  set(sid: string, sessionData: session.SessionData, callback?: (err?: any) => void): void {
    const ttl = this.getTTL(sessionData);
    const serialized = JSON.stringify(sessionData);

    this.client
      .set(this.key(sid), serialized, { ex: ttl })
      .then(() => callback?.())
      .catch((err) => callback?.(err));
  }

  destroy(sid: string, callback?: (err?: any) => void): void {
    this.client
      .del(this.key(sid))
      .then(() => callback?.())
      .catch((err) => callback?.(err));
  }

  touch(sid: string, sessionData: session.SessionData, callback?: (err?: any) => void): void {
    const ttl = this.getTTL(sessionData);
    this.client
      .expire(this.key(sid), ttl)
      .then(() => callback?.())
      .catch((err) => callback?.(err));
  }

  private getTTL(sessionData: session.SessionData): number {
    const maxAge = sessionData?.cookie?.maxAge;
    return maxAge ? Math.ceil(maxAge / 1000) : this.ttl;
  }
}
