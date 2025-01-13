import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepositoryImplement } from 'src/interface-adapters/repositories/item.repository.implement';

@Injectable()
export class GetItemByIdUseCase {
  constructor(private readonly itemRepository: ItemRepositoryImplement) {}

  async execute(item_id: string) {
    const item = await this.itemRepository.findById(item_id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${item_id} not found`);
    }
    return item;
  }
}
