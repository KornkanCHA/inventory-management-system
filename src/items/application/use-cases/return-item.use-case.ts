import { Injectable } from "@nestjs/common";
import { ItemBusinessRules } from "src/items/domain/business-rules/item.business-rules";
import { ItemRepositoryImplement } from "src/items/interface-adapters/repositories/item.repository.implement";
import { Item } from "src/items/domain/entities/item.entity";
import { ReturnItemDto } from "../dto/return-item.dto";

/**
 * Use case for handling the return of items.
 * @description This class contains the business logic for returning an item, ensuring necessary validations and updates are applied.
 */
@Injectable()
export class ReturnItemUseCase {
    constructor(private readonly itemRepository: ItemRepositoryImplement) {}

    /**
     * Executes the return of an item by its ID.
     * @param {string} item_id - The unique ID of the item to return.
     * @param {ReturnItemDto} returnItemDto - DTO containing the quantity to return.
     * @returns {Promise<Item>} The updated item after the return operation.
     */
    async execute(item_id: string, returnItemDto: ReturnItemDto): Promise<Item> {
        const item = await this.itemRepository.findById(item_id);
        
        ItemBusinessRules.validateExistingItem(item, item_id);

        const updatedItem = ItemBusinessRules.validateAndReturnItem(item, returnItemDto.quantity);
        await this.itemRepository.update(item_id, updatedItem);
        
        return updatedItem;
    }
}
