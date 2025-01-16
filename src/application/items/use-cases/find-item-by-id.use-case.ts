import { Injectable } from '@nestjs/common';
import { ItemRepositoryImplement } from 'src/interface-adapters/repositories/item.repository.implement';
import { Item } from 'src/domain/entities/item.entity';
import { ItemBusinessRules } from 'src/domain/business-rules/item.business-rules';

/**
 * Use case for retrieving an item by its ID.
 * @description This class contains the business logic for fetching an item and ensuring that the item exists.
 */
@Injectable()
export class GetItemByIdUseCase {
  constructor(private readonly itemRepository: ItemRepositoryImplement) {}

  /**
   * Executes the retrieval of an item by its ID.
   * @param {string} item_id - The unique ID of the item to retrieve.
   * @returns {Promise<Item>} The item with the specified ID.
   * @throws {NotFoundException} If the item with the given ID does not exist.
   */
  async execute(item_id: string): Promise<Item> {
    const item = await this.itemRepository.findById(item_id);
    
    ItemBusinessRules.validateExistingItem(item, item_id);

    return item;
  }
}
