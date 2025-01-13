import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/domain/entities/item.entity';
import { ItemRepositoryImplement } from 'src/interface-adapters/repositories/item.repository.implement';
import { CreateItemUseCase } from './create-item.use-case';
import { GetItemsUseCase } from './find-items.use-case';
import { GetItemByIdUseCase } from './find-item-by-id.use-case';
import { UpdateItemUseCase } from './update-item.use-case';
import { DeleteItemUseCase } from './delete-item.use-case';
import { ItemController } from 'src/interface-adapters/controllers/item.controller';
import { SearchItemUseCase } from './search-item.use-case';
import { BorrowItemUseCase } from './borrow-item.use-case';
import { ReturnItemUseCase } from './return-item.use-case';

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
