import { ConfigService } from '@nestjs/config';
import { Knex } from 'knex';
import * as dotenv from 'dotenv';

dotenv.config();

const configService = new ConfigService();

const knexConfig: Knex.Config = {
  client: 'pg',
  connection: {
    host: configService.get<string>('DB_HOST'),
    user: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
  },
  migrations: {
    directory: './src/migrations',
    tableName: 'knex_migrations',
  },
  seeds: {
    directory: './src/seeds',
  },
};

export default knexConfig;
module.exports = knexConfig;
