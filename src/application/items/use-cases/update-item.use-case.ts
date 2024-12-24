import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from 'src/interface-adapters/repositories/item.repository';
import { UpdateItemDto } from '../dto/update-item.dto';
import { Item } from 'src/domain/entities/item.entity';

@Injectable()
export class UpdateItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.itemRepository.findById(id);
    if (!item) {
      throw new NotFoundException(`Item with id ${id} not found`);
    }
    await this.itemRepository.update(id, updateItemDto);
    return this.itemRepository.findById(id);
  }
}
