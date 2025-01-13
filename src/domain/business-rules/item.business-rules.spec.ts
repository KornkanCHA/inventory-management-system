import { Item } from "../entities/item.entity";
import { ItemBusinessRules } from "./item.business-rules";

describe("ItemBusinessRules", () => {
    let sampleItem: Item;

    beforeEach(() => {
        sampleItem = {
            item_id: "1",
            name: "Sample Item",
            description: "Test Item",
            quantity: 10,
            borrowedQuantity: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    });

    describe("validateUniqueItem", () => {
        it("should combine quantities for duplicate item names", () => {
            const items = [sampleItem];
            const result = ItemBusinessRules.validateUniqueItem("Sample Item", 5, items);

            expect(result).toEqual(sampleItem);
            expect(result?.quantity).toBe(15);
        });

        it("should return null if no duplicate item is found", () => {
            const items = [sampleItem];
            const result = ItemBusinessRules.validateUniqueItem("Nonexistent Item", 5, items);

            expect(result).toBeNull();
        });
    });

    describe("validateAndBorrowItem", () => {
        it("should throw an error if borrow quantity is invalid", () => {
            expect(() => {
                ItemBusinessRules.validateAndBorrowItem(sampleItem, 0);
            }).toThrow("Borrow quantity must be a valid positive number.");
        });

        it("should throw an error if borrow quantity exceeds available stock", () => {
            expect(() => {
                ItemBusinessRules.validateAndBorrowItem(sampleItem, 11);
            }).toThrow("Insufficient quantity available.");
        });

        it("should pass validation for valid borrow quantity", () => {
            expect(() => {
                ItemBusinessRules.validateAndBorrowItem(sampleItem, 5);
            }).not.toThrow();
        });
    });

    describe("validateAndReturnItem", () => {
        it("should throw an error if return quantity is invalid", () => {
            expect(() => {
                ItemBusinessRules.validateAndReturnItem(sampleItem, 0);
            }).toThrow("Return quantity must be a valid positive number.");
        });

        it("should throw an error if return quantity exceeds borrowed quantity", () => {
            expect(() => {
                ItemBusinessRules.validateAndReturnItem(sampleItem, 3);
            }).toThrow("Return quantity exceeds borrowed quantity.");
        });

        it("should pass validation for valid return quantity", () => {
            expect(() => {
                ItemBusinessRules.validateAndReturnItem(sampleItem, 2);
            }).not.toThrow();
        });
    });

    describe("validateAndBorrowItem (execution)", () => {
        it("should correctly update quantity and borrowedQuantity when borrowing", () => {
            const updatedItem = ItemBusinessRules.validateAndBorrowItem(sampleItem, 3);

            expect(updatedItem.quantity).toBe(7);
            expect(updatedItem.borrowedQuantity).toBe(5);
        });
    });

    describe("validateAndReturnItem (execution)", () => {
        it("should correctly update quantity and borrowedQuantity when returning", () => {
            const updatedItem = ItemBusinessRules.validateAndReturnItem(sampleItem, 2);

            expect(updatedItem.quantity).toBe(12);
            expect(updatedItem.borrowedQuantity).toBe(0);
        });
    });
});
