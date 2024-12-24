import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from 'src/interface-adapters/repositories/item.repository';

@Injectable()
export class DeleteItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(id: string): Promise<void> {
    const existingItem = await this.itemRepository.findById(id);
    if (!existingItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    await this.itemRepository.delete(id);
  }
}
