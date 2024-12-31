import { Injectable } from '@nestjs/common';
import { ItemRepository } from 'src/interface-adapters/repositories/item.repository';
import { Item } from 'src/domain/entities/item.entity';

@Injectable()
export class SearchItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(query: string): Promise<Item[]> {
    return this.itemRepository.search(query);
  }
}
