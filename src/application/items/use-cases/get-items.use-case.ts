import { Injectable } from '@nestjs/common';
import { Item } from 'src/domain/entities/item.entity';
import { ItemRepository } from 'src/infrastructure/repositories/item.repository';

@Injectable()
export class GetItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  execute(): Item[] {
    return this.itemRepository.getAll();
  }
}
