import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { ElasticsearchHealthIndicator } from './elasticsearchHealthIndicator';

@Controller('health')
class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private typeOrmHealthIndicator: TypeOrmHealthIndicator,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator,
    private elasticsearchHealthIndicator: ElasticsearchHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      async () => this.typeOrmHealthIndicator.pingCheck('database'),
      // the process should not use more than 300MB memory
      async () =>
        this.memoryHealthIndicator.checkHeap('memory heap', 300 * 1024 * 1024),
      // The process should not have more than 300MB RSS memory allocated
      async () =>
        this.memoryHealthIndicator.checkRSS('memory RSS', 300 * 1024 * 1024),
      // the used disk storage should not exceed the 50% of the available space
      async () =>
        this.diskHealthIndicator.checkStorage('disk health', {
          thresholdPercent: 0.9,
          path: '/',
        }),
      () => this.elasticsearchHealthIndicator.isHealthy('elasticsearch'),
    ]);
  }
}

export default HealthController;
