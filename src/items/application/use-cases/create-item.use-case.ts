import { Injectable } from '@nestjs/common';
import { Item } from 'src/items/domain/entities/item.entity';
import { ItemRepositoryImplement } from 'src/items/interface-adapters/repositories/item.repository.implement';
import { CreateItemDto } from '../dto/create-item.dto';
import { ItemBusinessRules } from 'src/items/domain/business-rules/item.business-rules';
import { UpdateItemDto } from '../dto/update-item.dto'; // Import UpdateItemDto
import { UpdateItemUseCase } from './update-item.use-case';

/**
 * Use case for creating a new item or updating an existing item if the name already exists.
 * @description This class contains the business logic for creating a new item, and if an item with the same name already exists, it updates the quantity.
 */
@Injectable()
export class CreateItemUseCase {
    constructor(
      private readonly itemRepository: ItemRepositoryImplement,
      private readonly updateItemUseCase: UpdateItemUseCase 
    ) {}

    /**
     * Executes the creation or updating of an item if the name already exists.
     * @param {CreateItemDto} createItemDto - DTO containing the item details to be created.
     * @returns {Promise<Item>} The created or updated item.
     */
    async execute(createItemDto: CreateItemDto): Promise<Item> {
        const existingItems = await this.itemRepository.findAll();
        const updatedItem = ItemBusinessRules.validateUniqueItem(
          createItemDto.name,
          createItemDto.quantity,
          existingItems
        );

        if (updatedItem) {
            const updateItemDto: UpdateItemDto = { quantity: updatedItem.quantity };
            return await this.updateItemUseCase.execute(updatedItem.item_id, updateItemDto);
        }

        const newItem = await this.itemRepository.create(createItemDto);
        
        return newItem;
    }
}
