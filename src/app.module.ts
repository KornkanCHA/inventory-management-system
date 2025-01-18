import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/application/use-cases/item.use-cases.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

/**
 * The main module for the application.
 * @description This module imports necessary modules for configuring the application
 * Including configuration settings, database connection, and the items module for managing item-related use cases.
 * The configuration values like database credentials and environment settings are loaded from the `.env`.
 */
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        synchronize: configService.get('APP_ENV') === 'development',
        autoLoadEntities: true
      }),
      inject: [ConfigService]
    }),
    ItemsModule,
  ],
})
export class AppModule {}
