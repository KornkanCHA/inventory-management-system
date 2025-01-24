import { Injectable } from '@nestjs/common';
import { ItemService } from 'src/domain/item/service/item.service';
import { ItemRepository } from 'src/domain/item/repositories/item.repository';

/**
 * Use case for deleting an item.
 * @description This class handles the business logic for deleting an item,.
 */
@Injectable()
export class DeleteItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    /**
     * Executes the deletion of an item by its ID.
     * @param {string} item_id - The unique ID of the item to delete.
     * @returns {Promise<Object>} An object containing a success message.
     */
    async execute(item_id: string): Promise<Object> {
        const item = await this.itemRepository.findById(item_id);
      
        ItemService.validateExistingItem(item, item_id);

        await this.itemRepository.delete(item_id);
      
        return { message: `Item with ID ${item_id} has been deleted successfully.` };
    }
}