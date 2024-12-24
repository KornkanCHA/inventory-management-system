import { Injectable } from '@nestjs/common';
import { ItemRepository } from 'src/interface-adapters/repositories/item.repository';

@Injectable()
export class GetItemsUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute() {
    return this.itemRepository.findAll();
  }
}
