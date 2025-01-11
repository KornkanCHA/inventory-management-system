import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepositoryImplement } from 'src/interface-adapters/repositories/item.repository.implement';

@Injectable()
export class DeleteItemUseCase {
  constructor(private readonly itemRepository: ItemRepositoryImplement) {}

  async execute(item_id: string): Promise<Object> {
    const item = await this.itemRepository.findById(item_id);
    if (!item) {
      throw new NotFoundException(`Item with id ${item_id} not found`);
    }
    await this.itemRepository.delete(item_id);
    return { message: `Item with ID ${item_id} has been deleted successfully.` };
  }
}