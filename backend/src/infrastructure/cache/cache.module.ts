import { Module } from '@nestjs/common';
import { CacheClientFactory } from './cache.factory';
import { CacheService } from './cache.service';
@Module({
  providers: [CacheClientFactory, CacheService],
  exports: [CacheService],
})
export class CacheModule {}
