import { Injectable } from '@nestjs/common';
import { ItemRepositoryImplement } from 'src/items/interface-adapters/repositories/item.repository.implement';
import { Item } from 'src/items/domain/entities/item.entity';

/**
 * Use case for retrieving all items from the inventory.
 * @description This class contains the business logic for fetching all items from the repository.
 */
@Injectable()
export class GetItemsUseCase {
  constructor(private readonly itemRepository: ItemRepositoryImplement) {}

  /**
   * Executes the retrieval of all items.
   * @returns {Promise<Item[]>} A list of all items.
   */
  async execute(): Promise<Item[]> {
    return this.itemRepository.findAll();
  }
}
