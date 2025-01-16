import { Injectable } from '@nestjs/common';
import { ItemRepositoryImplement } from 'src/items/interface-adapters/repositories/item.repository.implement';
import { UpdateItemDto } from '../dto/update-item.dto';
import { Item } from 'src/items/domain/entities/item.entity';
import { ItemBusinessRules } from 'src/items/domain/business-rules/item.business-rules';

/**
 * Use case for updating an item in the inventory.
 * @description This class contains the business logic for updating an item, ensuring that the item exists 
 * and then applies the necessary updates to the item.
 */
@Injectable()
export class UpdateItemUseCase {
    constructor(private readonly itemRepository: ItemRepositoryImplement) {}

    /**
     * Executes the update of an item by its ID and updated data.
     * @param {string} item_id - The unique ID of the item to update.
     * @param {UpdateItemDto} updateItemDto - DTO containing the updated information for the item.
     * @returns {Promise<Item>} The updated item after applying the changes.
     */
    async execute(item_id: string, updateItemDto: UpdateItemDto): Promise<Item> {
        const item = await this.itemRepository.findById(item_id);

        ItemBusinessRules.validateExistingItem(item, item_id);

        await this.itemRepository.update(item_id, updateItemDto);
      
        return this.itemRepository.findById(item_id);
    }
}
