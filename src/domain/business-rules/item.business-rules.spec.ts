import { Item } from "../entities/item.entity";
import { ItemBusinessRules } from "./item.business-rules";

describe("ItemBusinessRules", () => {
    let sampleItem: Item;

    beforeEach(() => {
        sampleItem = {
            id: "1",
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

            expect(result).toBe(sampleItem);
            expect(result?.quantity).toBe(15);
        });

        it("should return null if no duplicate item is found", () => {
            const items = [sampleItem];
            const result = ItemBusinessRules.validateUniqueItem("Nonexistent Item", 5, items);

            expect(result).toBeNull();
        });
    });

    describe("validateBorrowItem", () => {
        it("should throw an error if borrow quantity is less than 1", () => {
            expect(() => {
                ItemBusinessRules.validateBorrowItem(sampleItem, 0);
            }).toThrow("Borrow quantity not be less than 1");
        });

        it("should throw an error if not enough quantity is available", () => {
            expect(() => {
                ItemBusinessRules.validateBorrowItem(sampleItem, 11);
            }).toThrow("Not enough quantity available");
        });

        it("should pass validation for valid borrow quantity", () => {
            expect(() => {
                ItemBusinessRules.validateBorrowItem(sampleItem, 5);
            }).not.toThrow();
        });
    });

    describe("executeBorrowItem", () => {
        it("should update the item's quantity and borrowedQuantity", () => {
            const updatedItem = ItemBusinessRules.executeBorrowItem(sampleItem, 3);

            expect(updatedItem.quantity).toBe(7);
            expect(updatedItem.borrowedQuantity).toBe(5);
        });
    });

    describe("validateReturnItem", () => {
        it("should throw an error if return quantity is less than 1", () => {
            expect(() => {
                ItemBusinessRules.validateReturnItem(sampleItem, 0);
            }).toThrow("Return quantity not be less than 1");
        });

        it("should throw an error if return quantity exceeds borrowedQuantity", () => {
            expect(() => {
                ItemBusinessRules.validateReturnItem(sampleItem, 3);
            }).toThrow("Invalid return quantity");
        });

        it("should pass validation for valid return quantity", () => {
            expect(() => {
                ItemBusinessRules.validateReturnItem(sampleItem, 2);
            }).not.toThrow();
        });
    });

    describe("executeReturnItem", () => {
        it("should update the item's quantity and borrowedQuantity", () => {
            const updatedItem = ItemBusinessRules.executeReturnItem(sampleItem, 2);

            expect(updatedItem.quantity).toBe(12);
            expect(updatedItem.borrowedQuantity).toBe(0);
        });
    });
});
