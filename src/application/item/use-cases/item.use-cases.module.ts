import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/infrastructure/entities/item.entity';
import { CreateItemUseCase } from './create-item.use-case';
import { GetItemsUseCase } from './find-items.use-case';
import { GetItemByIdUseCase } from './find-item-by-id.use-case';
import { UpdateItemUseCase } from './update-item.use-case';
import { DeleteItemUseCase } from './delete-item.use-case';
import { ItemController } from 'src/infrastructure/controllers/item.controller';
import { SearchItemUseCase } from './search-item.use-case';
import { BorrowItemUseCase } from './borrow-item.use-case';
import { ReturnItemUseCase } from './return-item.use-case';
import { ItemRepository } from 'src/domain/item/repositories/item.repository';
import { ItemRepositoryImplement } from 'src/infrastructure/repositories/item.repository.implement';

/**
 * The ItemsModule is responsible for managing all operations related to items.
 * @description It imports TypeOrmModule to manage database entities and registers the necessary
 * components including repositories, use cases, and controllers for the item management system.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [
    CreateItemUseCase,
    GetItemsUseCase,
    GetItemByIdUseCase,
    UpdateItemUseCase,
    DeleteItemUseCase,
    SearchItemUseCase,
    BorrowItemUseCase,
    ReturnItemUseCase,
    {
      provide: ItemRepository,
      useClass: ItemRepositoryImplement
    }
  ],
  controllers: [ItemController],
})
export class ItemsModule {}
