import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './application/item/use-cases/item.use-cases.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './infrastructure/config/typeorm.config';

/**
 * The main module for the application.
 * @description This module imports TypeOrm configuration for the application.
 */
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => typeOrmConfig(configService),
      inject: [ConfigService],
    }),
    ItemsModule,
  ],
})
export class AppModule {}
