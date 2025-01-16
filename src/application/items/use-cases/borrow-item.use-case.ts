import { Injectable} from "@nestjs/common";
import { ItemBusinessRules } from "src/domain/business-rules/item.business-rules";
import { ItemRepositoryImplement } from "src/interface-adapters/repositories/item.repository.implement";
import { Item } from "src/domain/entities/item.entity";
import { BorrowItemDto } from "../dto/borrow-item.dto";

/**
 * Use case for handling the borrowing of items.
 * @description This class contains the business logic for borrowing an item, ensuring all necessary validations are applied.
 */
@Injectable()
export class BorrowItemUseCase {
    constructor(private readonly itemRepository: ItemRepositoryImplement) {}

    /**
     * Executes the borrowing of an item by ID.
     * @param {string} item_id - The unique ID of the item to borrow.
     * @param {BorrowItemDto} borrowItemDto - DTO containing the quantity to borrow.
     * @returns {Promise<Item>} The updated item after borrowing.
     */
    async execute(item_id: string, borrowItemDto: BorrowItemDto): Promise<Item> {
        const item = await this.itemRepository.findById(item_id);
        
        ItemBusinessRules.validateExistingItem(item, item_id);
        
        const updatedItem = ItemBusinessRules.validateAndBorrowItem(item, borrowItemDto.quantity);
        await this.itemRepository.update(item_id, updatedItem);
        
        return updatedItem;
    }
}