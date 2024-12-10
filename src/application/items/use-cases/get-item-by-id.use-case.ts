import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from 'src/infrastructure/repositories/item.repository';
import { Item } from 'src/domain/entities/item.entity';

@Injectable()
export class GetItemByIdUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  execute(id: string): Item {
    const item = this.itemRepository.getById(id);
    if (!item) throw new NotFoundException(`Item with ID ${id} not found`);
    return item;
  }
}