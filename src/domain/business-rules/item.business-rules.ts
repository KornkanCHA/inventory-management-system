import { Item } from "../entities/item.entity";

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

    static borrowItem(item: Item, quantity: number): Item {
        if (quantity < 1) {
            throw new Error('Invalid borrow quantity');
        }
        if (item.quantity < quantity) {
            throw new Error('Not enough quantity available');
        }
        item.quantity -= quantity;
        item.borrowedQuantity += quantity;
        return item;
    }

    static returnItem(item: Item, quantity: number): Item {
        if (item.borrowedQuantity < quantity || quantity < 1) {
            throw new Error('Invalid return quantity');
        }
        item.quantity += quantity;
        item.borrowedQuantity -= quantity;
        return item;
    }
}