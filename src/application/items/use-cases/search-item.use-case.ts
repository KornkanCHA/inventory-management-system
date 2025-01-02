import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from 'src/interface-adapters/repositories/item.repository';
import { Item } from 'src/domain/entities/item.entity';

@Injectable()
export class SearchItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(query: string, sortBy = 'name', order: 'ASC' | 'DESC'): Promise<Item[]> {
    const items = await this.itemRepository.search(query, sortBy, order);
    if (items.length === 0) {
        throw new NotFoundException(`No matching items found for query: ${query}`);
    }
    return items;
  }
}
