import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'

@Injectable()
export class CacheService implements OnModuleDestroy {
  constructor(@Inject('RedisClient') private readonly redisClient: Redis) {}

  onModuleDestroy(): void {
    this.redisClient.disconnect()
  }

  async setWithExpiry(prefix: string, key: string, value: string, expiryInSecods: number): Promise<void> {
    await this.redisClient.set(`${prefix}:${key}`, value, 'EX', expiryInSecods)
  }

  async get(prefix: string, key: string): Promise<string | null> {
    return this.redisClient.get(`${prefix}:${key}`)
  }

  async deleteByKey(prefix: string, key: string): Promise<void> {
    await this.redisClient.del(`${prefix}:${key}`)
  }

  async deleteByPrefix(prefix: string): Promise<void> {
    const keys = await this.redisClient.keys(`${prefix}:*`)
    if (keys.length > 0) {
      await this.redisClient.del(...keys)
    }
  }
}
