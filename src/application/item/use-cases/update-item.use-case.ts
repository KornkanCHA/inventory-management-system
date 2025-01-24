import { Injectable } from '@nestjs/common';
import { ItemRepository } from 'src/domain/item/repositories/item.repository';
import { UpdateItemDto } from '../../../infrastructure/controllers/dto/update-item.dto';
import { Item } from 'src/domain/item/model/item.model';
import { ItemService } from 'src/domain/item/service/item.service';

/**
 * Use case for updating an item in the inventory.
 * @description This class contains the business logic for updating an item, ensuring that the item exists 
 * and then applies the necessary updates to the item.
 */
@Injectable()
export class UpdateItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    /**
     * Executes the update of an item by its ID and updated data.
     * @param {string} item_id - The unique ID of the item to update.
     * @param {UpdateItemDto} updateItemDto - DTO containing the updated information for the item.
     * @returns {Promise<Item>} The updated item after applying the changes.
     */
    async execute(item_id: string, updateItemDto: UpdateItemDto): Promise<Item> {
        const item = await this.itemRepository.findById(item_id);

        ItemService.validateExistingItem(item, item_id);

        await this.itemRepository.update(item_id, updateItemDto);
      
        return this.itemRepository.findById(item_id);
    }
}
