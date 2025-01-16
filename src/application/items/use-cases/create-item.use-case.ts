import { Injectable } from '@nestjs/common';
import { Item } from 'src/domain/entities/item.entity';
import { ItemRepositoryImplement } from 'src/interface-adapters/repositories/item.repository.implement';
import { CreateItemDto } from '../dto/create-item.dto';
import { ItemBusinessRules } from 'src/domain/business-rules/item.business-rules';

@Injectable()
export class CreateItemUseCase {
  constructor(private readonly itemRepository: ItemRepositoryImplement) {}

  async execute(createItemDto: CreateItemDto): Promise<Item> {
    const existingItems = await this.itemRepository.findAll();
    const updatedItem = ItemBusinessRules.validateUniqueItem(
      createItemDto.name,
      createItemDto.quantity,
      existingItems
    );

    if (updatedItem) {
      await this.itemRepository.update(updatedItem.item_id, {
        quantity: updatedItem.quantity
      });
      return updatedItem;
    }

    return await this.itemRepository.create(createItemDto);
  }
}