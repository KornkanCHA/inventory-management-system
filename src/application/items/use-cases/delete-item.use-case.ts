import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from 'src/infrastructure/repositories/item.repository';

@Injectable()
export class DeleteItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  execute(id: string): { message: string } {
    const item = this.itemRepository.getById(id);
    if (!item) throw new NotFoundException(`Item with ID ${id} not found`);
    this.itemRepository.delete(id);
    return { message: 'Delete successful' };
  }
}
