import { ItemService } from "../service/item.service";
import { Item } from "../model/item.model";
import { BadRequestError } from "../exception/custom-exception";
import { NotFoundError } from "../exception/custom-exception";

describe('ItemService', () => {
    let item: Item;

    beforeEach(() => {
        item = new Item('1', 'Item A', 'Description', 10, 0);
    });

    describe('updateQuantity', () => {
        it('should update the quantity correctly', () => {
            ItemService.updateQuantity(item, 5);
            expect(item.quantity).toBe(15);

            ItemService.updateQuantity(item, -3);
            expect(item.quantity).toBe(12);
        });
    });

    describe('updateBorrowedQuantity', () => {
        it('should update the borrowed quantity correctly', () => {
            ItemService.updateBorrowedQuantity(item, 3);
            expect(item.borrowedQuantity).toBe(3);

            ItemService.updateBorrowedQuantity(item, -2);
            expect(item.borrowedQuantity).toBe(1);
        });
    });

    describe('validatePositiveQuantity', () => {
        it('should throw BadRequestError if quantity is not a positive integer', () => {
            expect(() => ItemService.validatePositiveQuantity(1.5, 'Borrow')).toThrow(BadRequestError);
            expect(() => ItemService.validatePositiveQuantity(0.5, 'Return')).toThrow(BadRequestError);
            expect(() => ItemService.validatePositiveQuantity(-1.5, 'Borrow')).toThrow(BadRequestError);

            expect(() => ItemService.validatePositiveQuantity(NaN, 'Borrow')).toThrow(BadRequestError);
            expect(() => ItemService.validatePositiveQuantity(Infinity, 'Return')).toThrow(BadRequestError);

            expect(() => ItemService.validatePositiveQuantity(1, 'Borrow')).not.toThrow();
            expect(() => ItemService.validatePositiveQuantity(10, 'Return')).not.toThrow();
        });
    });

    describe('validateSearchResults', () => {
        it('should throw NotFoundError if no items match the query', () => {
            const items: Item[] = [];
            expect(() => ItemService.validateSearchResults(items, 'Non existing Item')).toThrow(NotFoundError);
        });

        it('should not throw an error if items are found', () => {
            const items = [item];
            expect(() => ItemService.validateSearchResults(items, 'Item A')).not.toThrow();
        });
    });

    describe('validateExistingItem', () => {
        it('should throw NotFoundError if the item does not exist', () => {
            const item: Item | null = null;
            expect(() => ItemService.validateExistingItem(item, 'non-existing-id')).toThrow(NotFoundError);
        });

        it('should not throw an error if the item exists', () => {
            const item = new Item('1', 'Item A', 'Description', 10, 0);
            expect(() => ItemService.validateExistingItem(item, '1')).not.toThrow();
        });
    });

    describe('validateUniqueItem', () => {
        it('should return the existing item and update quantity if a duplicate is found', () => {
            const existingItems = [item];
            const updatedItem = ItemService.validateUniqueItem('Item A', 5, existingItems);
            expect(updatedItem).toEqual(existingItems[0]);
            expect(existingItems[0].quantity).toBe(15);
        });

        it('should return null if no duplicate is found', () => {
            const existingItems = [item];
            const updatedItem = ItemService.validateUniqueItem('Item B', 5, existingItems);
            expect(updatedItem).toBeNull();
        });
    });

    describe('validateAndBorrowItem', () => {
        it('should throw BadRequestError if borrow quantity is invalid or insufficient stock', () => {
            expect(() => ItemService.validateAndBorrowItem(item, -15)).toThrow(BadRequestError); 
            expect(() => ItemService.validateAndBorrowItem(item, 0)).toThrow(BadRequestError); 
            expect(() => ItemService.validateAndBorrowItem(item, 15)).toThrow(BadRequestError);
        });

        it('should update the item correctly when borrowing', () => {
            const updatedItem = ItemService.validateAndBorrowItem(item, 5);
            expect(updatedItem.quantity).toBe(5);
            expect(updatedItem.borrowedQuantity).toBe(5);
        });
    });

    describe('validateAndReturnItem', () => {
        it('should throw BadRequestError if return quantity is invalid or exceeds borrowed quantity', () => {
            item.borrowedQuantity = 5;

            expect(() => ItemService.validateAndReturnItem(item, -5)).toThrow(BadRequestError);  
            expect(() => ItemService.validateAndReturnItem(item, 0)).toThrow(BadRequestError); 
            expect(() => ItemService.validateAndReturnItem(item, 15)).toThrow(BadRequestError); 
        });

        it('should update the item correctly when returning', () => {
            item.borrowedQuantity = 5; 
            const updatedItem = ItemService.validateAndReturnItem(item, 3);
            expect(updatedItem.quantity).toBe(13);
            expect(updatedItem.borrowedQuantity).toBe(2);
        });
    });
});
