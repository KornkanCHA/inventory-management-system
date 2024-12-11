import { Injectable } from '@nestjs/common';
import { Item } from 'src/domain/entities/item.entity';
import { ItemRepository } from 'src/infrastructure/repositories/item.repository';
import { CreateItemDto } from '../dto/create-item.dto';

@Injectable()
export class CreateItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}
  
  execute(createItemDto: CreateItemDto): Item {
    const status = createItemDto.status ?? 'Available';

    const newItem = new Item(
      this.itemRepository.generateId(),
      createItemDto.name,
      createItemDto.description,
      status,
      new Date(),
      new Date(),
    );
    
    return this.itemRepository.create(newItem)
  }
}