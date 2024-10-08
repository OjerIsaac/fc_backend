import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { JwtModule } from '@nestjs/jwt';
import Knex from 'knex';
import { envVarsSchema } from './libs/helpers';
import { HealthModule } from './health';
import { BrandModule } from './brand/brand.module';
import { MealModule } from './meal/meal.module';
import { AddonModule } from './addon/addon.module';
import { OrderModule } from './order/order.module';

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
            tableName: 'knex_migrations',
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
    BrandModule,
    MealModule,
    AddonModule,
    OrderModule,
    {
      ...JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '3h' },
      }),
      global: true,
    },
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
