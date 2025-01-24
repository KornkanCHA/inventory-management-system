import { Injectable} from "@nestjs/common";
import { ItemService } from "src/domain/item/service/item.service";
import { ItemRepository } from "src/domain/item/repositories/item.repository";
import { Item } from "src/domain/item/model/item.model";
import { BorrowItemDto } from "../../../infrastructure/controllers/dto/borrow-item.dto";

/**
 * Use case for handling the borrowing of items.
 * @description This class contains the business logic for borrowing an item, ensuring all necessary validations are applied.
 */
@Injectable()
export class BorrowItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    /**
     * Executes the borrowing of an item by ID.
     * @param {string} item_id - The unique ID of the item to borrow.
     * @param {BorrowItemDto} borrowItemDto - DTO containing the quantity to borrow.
     * @returns {Promise<Item>} The updated item after borrowing.
     */
    async execute(item_id: string, borrowItemDto: BorrowItemDto): Promise<Item> {
        const item = await this.itemRepository.findById(item_id);
            
        ItemService.validateExistingItem(item, item_id);
        
        const updatedItem = ItemService.validateAndBorrowItem(item, borrowItemDto.quantity);
        await this.itemRepository.update(item_id, updatedItem);
        
        return updatedItem;
    }
}