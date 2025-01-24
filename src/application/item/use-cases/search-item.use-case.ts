import { Injectable } from '@nestjs/common';
import { ItemRepository } from 'src/domain/item/repositories/item.repository';
import { Item } from 'src/domain/item/model/item.model';
import { ItemService } from 'src/domain/item/service/item.service';

/**
 * Use case for searching items based on a query.
 * @description This class contains the business logic for searching items by a query string and validates the search results.
 */
@Injectable()
export class SearchItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    /**
     * Executes the search for items based on the provided query.
     * @param {string} query - The search query to find items.
     * @param {string} [sortBy='name'] - The field to sort by, default is 'name'.
     * @param {'ASC' | 'DESC'} [order='ASC'] - The sort order, either 'ASC' or 'DESC', default is 'ASC'.
     * @returns {Promise<Item[]>} A promise that resolves to an array of items that match the search query.
     */
    async execute(query: string, sortBy = 'name', order: 'ASC' | 'DESC'): Promise<Item[]> {
        const items = await this.itemRepository.search(query, sortBy, order);

        ItemService.validateSearchResults(items, query);
      
        return items;
    }
}
