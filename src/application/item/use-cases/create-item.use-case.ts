import { Injectable } from '@nestjs/common';
import { Item } from 'src/domain/item/model/item.model';
import { CreateItemDto } from '../../../infrastructure/controllers/dto/create-item.dto';
import { ItemService } from 'src/domain/item/service/item.service';
import { UpdateItemDto } from '../../../infrastructure/controllers/dto/update-item.dto';
import { UpdateItemUseCase } from './update-item.use-case';
import { ItemRepository } from 'src/domain/item/repositories/item.repository';

/**
 * Use case for creating a new item or updating an existing item if the name already exists.
 * @description This class contains the business logic for creating a new item, and if an item with the same name already exists, it updates the quantity.
 */
@Injectable()
export class CreateItemUseCase {
    constructor(
      private readonly itemRepository: ItemRepository,
      private readonly updateItemUseCase: UpdateItemUseCase 
    ) {}

    /**
     * Executes the creation or updating of an item if the name already exists.
     * @param {CreateItemDto} createItemDto - DTO containing the item details to be created.
     * @returns {Promise<Item>} The created or updated item.
     */
    async execute(createItemDto: CreateItemDto): Promise<Item> {
        const existingItems = await this.itemRepository.findAll();
        const updatedItem = ItemService.validateUniqueItem(
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
