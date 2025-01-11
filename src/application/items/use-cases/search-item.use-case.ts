import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepositoryImplement } from 'src/interface-adapters/repositories/item.repository.implement';
import { Item } from 'src/domain/entities/item.entity';

@Injectable()
export class SearchItemUseCase {
  constructor(private readonly itemRepository: ItemRepositoryImplement) {}

  async execute(query: string, sortBy = 'name', order: 'ASC' | 'DESC'): Promise<Item[]> {
    const items = await this.itemRepository.search(query, sortBy, order);
    if (items.length === 0) {
        throw new NotFoundException(`No matching items found for query: ${query}`);
    }
    return items;
  }
}
