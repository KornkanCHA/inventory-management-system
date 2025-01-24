import { Injectable } from "@nestjs/common";
import { ItemService } from "src/domain/item/service/item.service";
import { ItemRepository } from "src/domain/item/repositories/item.repository";
import { Item } from "src/domain/item/model/item.model";
import { ReturnItemDto } from "../../../infrastructure/controllers/dto/return-item.dto";

/**
 * Use case for handling the return of items.
 * @description This class contains the business logic for returning an item, ensuring necessary validations and updates are applied.
 */
@Injectable()
export class ReturnItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}
        
    /**
     * Executes the return of an item by its ID.
     * @param {string} item_id - The unique ID of the item to return.
     * @param {ReturnItemDto} returnItemDto - DTO containing the quantity to return.
     * @returns {Promise<Item>} The updated item after the return operation.
     */
    async execute(item_id: string, returnItemDto: ReturnItemDto): Promise<Item> {
        const item = await this.itemRepository.findById(item_id);
        
        ItemService.validateExistingItem(item, item_id);

        const updatedItem = ItemService.validateAndReturnItem(item, returnItemDto.quantity);
        await this.itemRepository.update(item_id, updatedItem);

        return updatedItem;
    }
}
