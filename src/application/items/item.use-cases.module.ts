import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/domain/entities/item.entity';
import { ItemRepositoryImplement } from 'src/interface-adapters/repositories/item.repository.implement';
import { CreateItemUseCase } from './use-cases/create-item.use-case';
import { GetItemsUseCase } from './use-cases/get-items.use-case';
import { GetItemByIdUseCase } from './use-cases/get-item-by-id.use-case';
import { UpdateItemUseCase } from './use-cases/update-item.use-case';
import { DeleteItemUseCase } from './use-cases/delete-item.use-case';
import { ItemController } from 'src/interface-adapters/controllers/item.controller';
import { SearchItemUseCase } from './use-cases/search-item.use-case';
import { BorrowItemUseCase } from './use-cases/borrow-item.use-case';
import { ReturnItemUseCase } from './use-cases/return-item.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [
    ItemRepositoryImplement,
    CreateItemUseCase,
    GetItemsUseCase,
    GetItemByIdUseCase,
    UpdateItemUseCase,
    DeleteItemUseCase,
    SearchItemUseCase,
    BorrowItemUseCase,
    ReturnItemUseCase
  ],
  controllers: [ItemController],
})
export class ItemsModule {}
