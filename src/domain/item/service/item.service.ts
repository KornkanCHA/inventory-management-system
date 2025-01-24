import { Item } from "../model/item.model";
import { BadRequestError } from "../exception/custom-exception";
import { NotFoundError } from "../exception/custom-exception";  

/**
 * Handles business logic for item operations.
 * @description This class contains methods to validate items, manage borrowing and returning logic,
 */
export class ItemService {

    /**
     * Updates the item quantity when borrowing or returning items.
     * @param {number} quantity - The quantity change (positive or negative).
     * @param {Item} item - Item to update quantity.
     */
    static updateQuantity(item: Item, quantity: number): void {
        item.quantity += quantity;
    }

    /**
     * Updates the borrowed quantity when borrowing or returning items.
     * @param {number} quantity - The borrowed quantity change (positive or negative).
     * @param {Item} item - Item to update borrowed quantity.
     */
    static updateBorrowedQuantity(item: Item, quantity: number): void {
        item.borrowedQuantity += quantity;
    }

    /**
     * Validates that the provided quantity is a positive number.
     * @param {number} quantity - The quantity to validate.
     * @param {string} operation - The context of the validation (e.g., 'Borrow', 'Return').
     * @throws {BadRequestError} If the quantity is not valid.
     */
    static validatePositiveQuantity(quantity: number, operation: string): void {
        if (isNaN(quantity) || !Number.isInteger(quantity) || quantity <= 0) {
            throw new BadRequestError(`${operation} quantity must be a valid positive number`);
        }
    }

    /**
    * Validates the search query results to check if items exist.
    * @param {Item[]} items - List of items found from the search query.
    * @param {string} query - The search query string.
    * @throws {NotFoundError} If no items are found for the query.
    */
    static validateSearchResults(items: Item[], query: string): void {
        if (items.length === 0) {
            throw new NotFoundError(`No matching items found for query: ${query}`);
        }
    }

    /**
     * Validates if the item exists.
     * @param {Item} item - The item to validate.
     * @param {string} item_id - The ID of the item.
     * @throws {NotFoundError} If the item does not exist.
     */
    static validateExistingItem(item: Item, item_id: string): void {
        if (!item) {
            throw new NotFoundError(`Item with ID ${item_id} not found`);
        }
    }

    /**
     * Combines the quantity of items if the name is duplicated.
     * @param {string} name - The name of the item.
     * @param {number} quantity - The quantity to add.
     * @param {Item[]} existingItems - List of existing items to check.
     * @returns {Item | null} The updated item or null if no duplicate is found.
     */
    static validateUniqueItem(name: string, quantity: number, existingItems: Item[]): Item | null {
        const existingItem = existingItems.find(
            item => item.name.toLowerCase() === name.toLowerCase()
        );
        if (existingItem) {
            this.updateQuantity(existingItem, quantity);
            return existingItem;
        }
        return null;
    }

    /**
     * Validates and processes borrowing an item.
     * @param {Item} item - The item to borrow.
     * @param {number} borrowQuantity - The quantity to borrow.
     * @returns {Item} The updated item after borrowing.
     * @throws {BadRequestError} If borrow quantity is invalid or insufficient stock.
     */
    static validateAndBorrowItem(item: Item, borrowQuantity: number): Item {
        this.validatePositiveQuantity(borrowQuantity, 'Borrow');

        if (item.quantity < borrowQuantity) {
            throw new BadRequestError('Insufficient quantity available');
        }

        this.updateQuantity(item, -borrowQuantity);
        this.updateBorrowedQuantity(item, borrowQuantity);
        return item;
    }

    /**
     * Validates and processes returning an item.
     * @param {Item} item - The item to return.
     * @param {number} returnQuantity - The quantity to return.
     * @returns {Item} The updated item after return.
     * @throws {BadRequestError} If return quantity is invalid or exceeds borrowed quantity.
     */
    static validateAndReturnItem(item: Item, returnQuantity: number): Item {
        this.validatePositiveQuantity(returnQuantity, 'Return');

        if (item.borrowedQuantity < returnQuantity) {
            throw new BadRequestError(`Return quantity exceeds borrowed quantity`);
        }

        this.updateQuantity(item, returnQuantity);
        this.updateBorrowedQuantity(item, -returnQuantity);
        return item;
    }
}
