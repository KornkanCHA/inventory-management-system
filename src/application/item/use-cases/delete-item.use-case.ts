import { Injectable } from '@nestjs/common';
import { ItemBusinessRules } from 'src/domain/item/business-rules/item.business-rules';
import { ItemRepositoryImplement } from 'src/infrastructure/repositories/item.repository.implement';

/**
 * Use case for deleting an item.
 * @description This class handles the business logic for deleting an item,.
 */
@Injectable()
export class DeleteItemUseCase {
    constructor(private readonly itemRepository: ItemRepositoryImplement) {}

    /**
     * Executes the deletion of an item by its ID.
     * @param {string} item_id - The unique ID of the item to delete.
     * @returns {Promise<Object>} An object containing a success message.
     */
    async execute(item_id: string): Promise<Object> {
        const item = await this.itemRepository.findById(item_id);
      
        ItemBusinessRules.validateExistingItem(item, item_id);

        await this.itemRepository.delete(item_id);
      
        return { message: `Item with ID ${item_id} has been deleted successfully.` };
    }
}