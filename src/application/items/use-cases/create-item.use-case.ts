import { Injectable } from '@nestjs/common';
import { Item } from 'src/domain/entities/item.entity';
import { ItemRepository } from 'src/interface-adapters/repositories/item.repository';
import { CreateItemDto } from '../dto/create-item.dto';
import { ItemBusinessRules } from 'src/domain/business-rules/item.business-rules';

@Injectable()
export class CreateItemUseCase {
  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(createItemDto: CreateItemDto): Promise<Item> {
    const existingItems = await this.itemRepository.findAll();
    const updateItem = ItemBusinessRules.ValidateUniqueItem(
      createItemDto.name,
      createItemDto.quantity,
      existingItems
    );

    if (updateItem) {
      await this.itemRepository.update(updateItem.id, {
        quantity: updateItem.quantity
      });
      return updateItem;
    }

    return await this.itemRepository.create(createItemDto);
  }
}