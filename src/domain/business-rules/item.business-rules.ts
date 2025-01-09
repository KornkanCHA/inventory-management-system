import { Item } from "../entities/item.entity";

/**
 * Handles business logic for item operations.
 */
export class ItemBusinessRules {
    /**
     * Combines qunatity of items if the name is duplicated.
     * @param name - The name of the item.
     * @param qunatity - The quantity to add.
     * @param existingItems - List of existing items to check.
     * @return The updated item or null if duplicate not found.
     */
    static validateUniqueItem(
        name: string,
        quantity: number,
        existingItems: Item[]
    ): Item | null {
        const existingItem = existingItems.find(item => item.name.toLowerCase() === name.toLowerCase());
        if (existingItem) {
            existingItem.quantity += quantity;
            return existingItem;
        }
        return null;
    }

    /**
     * Check if the borrow quantity is valid.
     * @param item 
     * @param borrowQuantity 
     * @throws If the quantity is less than 1 or not enough items are available.
     */
    static validateBorrowItem(item: Item, borrowQuantity: number): void {
        if (borrowQuantity < 1) {
            throw new Error('Borrow quantity not be less than 1');
        }

        if (item.quantity < borrowQuantity) {
            throw new Error('Not enough quantity available');
        }
    }

    /**
     * Update the item quantity when borrowed.
     * @param item - The item to borrow.
     * @param borrowQuantity - The quantity to borrow.
     * @returns The updated item.
     */
    static executeBorrowItem(item: Item, borrowQuantity: number): Item {
        item.quantity -= borrowQuantity;
        item.borrowedQuantity += borrowQuantity;
        return item;
    }

    /**
     * Check if the return quantity is valid.
     * @param item 
     * @param returnQuantity 
     * @throws If the quantity is less than 1 or not enough borrowed quantity are available.
     */
    static validateReturnItem(item: Item, returnQuantity: number): void {
        if (returnQuantity < 1) {
            throw new Error('Return quantity not be less than 1')
        }
        
        if (item.borrowedQuantity < returnQuantity) {
            throw new Error('Invalid return quantity');
        }
    }

    /**
     * Update the item quantity when returned.
     * @param item - The item to return.
     * @param returnQuantity - The quantity to return.
     * @returns The updated item.
     */
    static executeReturnItem(item: Item, returnQuantity: number): Item {
        item.quantity += returnQuantity;
        item.borrowedQuantity -= returnQuantity;
        return item;
    }
}