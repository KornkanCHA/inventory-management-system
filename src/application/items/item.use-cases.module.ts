import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/domain/entities/item.entity';
import { ItemRepository } from 'src/interface-adapters/repositories/item.repository';
import { CreateItemUseCase } from './use-cases/create-item.use-case';
import { GetItemsUseCase } from './use-cases/get-items.use-case';
import { GetItemByIdUseCase } from './use-cases/get-item-by-id.use-case';
import { UpdateItemUseCase } from './use-cases/update-item.use-case';
import { DeleteItemUseCase } from './use-cases/delete-item.use-case';
import { ItemsController } from 'src/interface-adapters/controllers/items.controller';
import { SearchItemUseCase } from './use-cases/search-item.use-case';
import { BorrowItemUseCase } from './use-cases/borrow-item.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [
    ItemRepository,
    CreateItemUseCase,
    GetItemsUseCase,
    GetItemByIdUseCase,
    UpdateItemUseCase,
    DeleteItemUseCase,
    SearchItemUseCase,
    BorrowItemUseCase
  ],
  controllers: [ItemsController],
})
export class ItemsModule {}
