import { Module } from '@nestjs/common';
import { ItemRepository } from 'src/infrastructure/repositories/item.repository';
import { CreateItemUseCase } from './create-item.use-case';
import { GetItemsUseCase } from './get-items.use-case';
import { GetItemByIdUseCase } from './get-item-by-id.use-case';
import { UpdateItemUseCase } from './update-item.use-case';
import { DeleteItemUseCase } from './delete-item.use-case';

@Module({
  providers: [
    ItemRepository,
    CreateItemUseCase,
    GetItemsUseCase,
    GetItemByIdUseCase,
    UpdateItemUseCase,
    DeleteItemUseCase,
  ],
  exports: [
    CreateItemUseCase,
    GetItemsUseCase,
    GetItemByIdUseCase,
    UpdateItemUseCase,
    DeleteItemUseCase,
  ],
})
export class ItemUseCasesModule {}
