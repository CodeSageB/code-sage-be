import { StartedTestContainer } from 'testcontainers';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const envVariables = {
  POSTGRES_DB: 'testdb',
  POSTGRES_USER: 'testuser',
  POSTGRES_PASSWORD: 'testpassword'
};

export class ConfigTestHelper {
  public static get getTestEnvVariables(): Record<string, string> {
    return { ...envVariables };
  }

  public static get getPort(): number {
    return 5432;
  }

  public static prepareTypeOrmOptions(
    pgContainer: StartedTestContainer
  ): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: pgContainer.getHost(),
      port: pgContainer.getMappedPort(ConfigTestHelper.getPort),
      username: envVariables.POSTGRES_USER,
      password: envVariables.POSTGRES_PASSWORD,
      database: envVariables.POSTGRES_DB,
      synchronize: true
    };
  }
}
