import { registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';
import { join } from 'path';

export default registerAs('database', () => {
  const isProduction = process.env.NODE_ENV === 'production';

  let databaseConfig: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    entities: string[];
    synchronize: boolean;
    logging: boolean;
    migrations: string[];
    migrationsTableName: string;
    ssl?: any;
  } = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 35432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    synchronize: !isProduction,
    logging: !isProduction,
    migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
    migrationsTableName: 'migrations'
  };

  if (isProduction) {
    databaseConfig = {
      ...databaseConfig,
      ssl: {
        ca: readFileSync(
          join(__dirname, '..', '..', 'assets', 'eu-north-1-bundle.pem')
        ).toString()
      }
    };
  }

  return databaseConfig;
});
