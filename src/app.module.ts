import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import Knex from 'knex';
import { envVarsSchema } from './libs/helpers';
import { HealthModule } from './health';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema: envVarsSchema,
    }),
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const knexConfig = {
          client: 'pg',
          connection: {
            host: configService.get('DB_HOST'),
            user: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
          },
          migrations: {
            directory: './migrations',
          },
          seeds: {
            directory: './seeds',
          },
        };

        const knex = Knex(knexConfig);

        return {
          config: knexConfig,
          knex,
        };
      },
      inject: [ConfigService],
    }),
    HealthModule,
  ],
  providers: [
    {
      provide: 'KnexConnection',
      useFactory: async (configService: ConfigService) => {
        const knex = Knex({
          client: 'pg',
          connection: {
            host: configService.get('DB_HOST'),
            user: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
          },
        });

        return knex;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['KnexConnection'],
})
export class AppModule {}
