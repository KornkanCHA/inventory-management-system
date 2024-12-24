import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './application/items/item.use-cases.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'inventory-management-system',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    ItemsModule,
  ],
})
export class AppModule {}
