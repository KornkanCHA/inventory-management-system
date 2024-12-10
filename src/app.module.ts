import { Module } from '@nestjs/common';
import { ItemController } from './interface-adapters/controllers/items.controller';
import { ItemUseCasesModule } from './application/items/use-cases/item.use-cases.module';

@Module({
  imports: [ItemUseCasesModule],
  controllers: [ItemController],
})
export class AppModule {}
