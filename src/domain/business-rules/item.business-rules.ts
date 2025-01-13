import { Item } from "../entities/item.entity";
import { BadRequestException } from "@nestjs/common";

/**
 * Handles business logic for item operations, including validation and updates.
 */
export class ItemBusinessRules {
    // Error messages
    private static readonly ERROR_MESSAGES = {
        INVALID_QUANTITY: 'Quantity must be a positive number.',
        INSUFFICIENT_QUANTITY: 'Insufficient quantity available.',
        EXCEEDS_BORROWED: 'Return quantity exceeds borrowed quantity.',
    };

    /**
     * Validates that the provided quantity is a positive number.
     * @param quantity - The quantity to validate.
     * @param operation - The context of the validation (e.g., 'Borrow', 'Return').
     * @throws If the quantity is not valid.
     */
    private static validatePositiveQuantity(quantity: number, operation: string): void {
        if (isNaN(quantity) || quantity <= 0) {
            throw new BadRequestException(`${operation} quantity must be a valid positive number.`);
        }
    }

    /**
     * Combines the quantity of items if the name is duplicated.
     * @param name - The name of the item.
     * @param quantity - The quantity to add.
     * @param existingItems - List of existing items to check.
     * @returns The updated item or null if no duplicate is found.
     */
    static validateUniqueItem(
        name: string,
        quantity: number,
        existingItems: Item[]
    ): Item | null {
        const existingItem = existingItems.find(
            item => item.name.toLowerCase() === name.toLowerCase()
        );
        if (existingItem) {
            existingItem.quantity += quantity;
            return existingItem;
        }
        return null;
    }

    /**
     * Validates and processes borrowing an item.
     * @param item - The item to borrow.
     * @param borrowQuantity - The quantity to borrow.
     * @throws If borrow quantity is invalid or insufficient stock.
     */
    static validateAndBorrowItem(item: Item, borrowQuantity: number): Item {
        this.validatePositiveQuantity(borrowQuantity, 'Borrow');

        if (item.quantity < borrowQuantity) {
            throw new BadRequestException(this.ERROR_MESSAGES.INSUFFICIENT_QUANTITY);
        }

        item.quantity -= borrowQuantity;
        item.borrowedQuantity += borrowQuantity;
        return item;
    }

    /**
     * Validates and processes returning an item.
     * @param item - The item to return.
     * @param returnQuantity - The quantity to return.
     * @throws If return quantity is invalid or exceeds borrowed quantity.
     */
    static validateAndReturnItem(item: Item, returnQuantity: number): Item {
        this.validatePositiveQuantity(returnQuantity, 'Return');

        if (item.borrowedQuantity < returnQuantity) {
            throw new BadRequestException(this.ERROR_MESSAGES.EXCEEDS_BORROWED);
        }

        item.quantity += returnQuantity;
        item.borrowedQuantity -= returnQuantity;
        return item;
    }
}
