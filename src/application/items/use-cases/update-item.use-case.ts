import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from 'src/interface-adapters/repositories/item.repository';
import { UpdateItemDto } from '../dto/update-item.dto';

@Injectable()
export class UpdateItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(id: string, updateItemDto: UpdateItemDto): Promise<void> {
    const existingItem = await this.itemRepository.findById(id);
    if (!existingItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    await this.itemRepository.update(id, updateItemDto);
  }
}
