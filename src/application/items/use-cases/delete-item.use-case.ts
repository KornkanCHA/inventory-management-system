import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepositoryImplement } from 'src/interface-adapters/repositories/item.repository.implement';

@Injectable()
export class DeleteItemUseCase {
  constructor(private readonly itemRepository: ItemRepositoryImplement) {}

  async execute(id: string): Promise<Object> {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    await this.itemRepository.delete(id);
    return { message: `Item with ID ${id} has been deleted successfully.` };
  }
}