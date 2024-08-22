import { Controller, Get, Inject } from '@nestjs/common';
import { HealthCheckService, HealthCheck, HealthIndicatorResult } from '@nestjs/terminus';
import { Knex } from 'knex';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    @Inject('KnexConnection') private readonly knex: Knex
  ) {}

  @Get('database')
  @HealthCheck()
  async checkDatabase() {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => {
        try {
          await this.knex.raw('SELECT 1+1 AS result');
          return {
            database: {
              status: 'up',
              message: 'Database connection is successful',
            },
          };
        } catch (error) {
          return {
            database: {
              status: 'down',
              message: `Database connection failed: ${error.message}`,
            },
          };
        }
      },
    ]);
  }
}
