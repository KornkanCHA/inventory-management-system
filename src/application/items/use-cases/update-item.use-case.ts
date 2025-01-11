import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepositoryImplement } from 'src/interface-adapters/repositories/item.repository.implement';
import { UpdateItemDto } from '../dto/update-item.dto';
import { Item } from 'src/domain/entities/item.entity';

@Injectable()
export class UpdateItemUseCase {
  constructor(private readonly itemRepository: ItemRepositoryImplement) {}

  async execute(item_id: string, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.itemRepository.findById(item_id);
    if (!item) {
      throw new NotFoundException(`Item with id ${item_id} not found`);
    }
    await this.itemRepository.update(item_id, updateItemDto);
    return this.itemRepository.findById(item_id);
  }
}
