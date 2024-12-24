import { Injectable } from '@nestjs/common';
import { Item } from 'src/domain/entities/item.entity';
import { ItemRepository } from 'src/interface-adapters/repositories/item.repository';
import { CreateItemDto } from '../dto/create-item.dto';

@Injectable()
export class CreateItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(crateItemDto: CreateItemDto): Promise<Item> {
    return this.itemRepository.create(crateItemDto);
  }
}