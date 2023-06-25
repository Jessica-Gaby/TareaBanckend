import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from '../seeds/database-seeder';


@Global()
@Module({
  providers: [
    ...databaseProviders,
    DatabaseSeeder,
    CategorySeeder,
    ProductSeeder,
  ],
  exports: [...databaseProviders, DatabaseSeeder],
})
export class DatabaseModule {}