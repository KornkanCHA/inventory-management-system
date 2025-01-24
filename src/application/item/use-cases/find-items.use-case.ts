import { Injectable } from '@nestjs/common';
import { ItemRepository } from 'src/domain/item/repositories/item.repository';
import { Item } from 'src/domain/item/model/item.model';

/**
 * Use case for retrieving all items from the inventory.
 * @description This class contains the business logic for fetching all items from the repository.
 */
@Injectable()
export class GetItemsUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    /**
     * Executes the retrieval of all items.
     * @returns {Promise<Item[]>} A list of all items.
     */
    async execute(): Promise<Item[]> {
        return this.itemRepository.findAll();
    }
}
