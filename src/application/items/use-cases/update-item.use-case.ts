import { Injectable, NotFoundException } from '@nestjs/common';
import { ItemRepository } from 'src/infrastructure/repositories/item.repository';
import { UpdateItemDto } from '../dto/update-item.dto';
import { Item } from 'src/domain/entities/item.entity';

@Injectable()
export class UpdateItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  execute(id: string, updateItemDto: UpdateItemDto): Item {
    const item = this.itemRepository.getById(id);
    if (!item) throw new NotFoundException(`Item with ID ${id} not found`);

    if (updateItemDto.name) item.name = updateItemDto.name;
    if (updateItemDto.description) item.description = updateItemDto.description;
    if (updateItemDto.status) item.status = updateItemDto.status;

    item.updated_at = new Date();
    return this.itemRepository.update(item);
  }
}
