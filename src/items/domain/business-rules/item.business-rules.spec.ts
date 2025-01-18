import { BadRequestException, NotFoundException } from "@nestjs/common";
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

    describe("validateSearchResult", () => {
        it("should throw a exception if no items are found", () => {
            const mockItems: Item[] = [];
            expect(() => {
                ItemBusinessRules.validateSearchResults(mockItems, '1')
            }).toThrow(NotFoundException);
        })

        it("should not throw an exception if items are found", () => {
            const mockItems: Item[] = [sampleItem];
            expect(() => {
                ItemBusinessRules.validateSearchResults(mockItems, '1')
            }).not.toThrow()
        })
    })

    describe("validateExisitngItem", () => {
        it("should throw an exception if item does not exist", () => {
            const mockItem = null;
            const mockItemId = '2';

            expect(() => {
                ItemBusinessRules.validateExistingItem(mockItem, mockItemId)
            }).toThrow(NotFoundException);
        })

        it("should not throw an exception if item exist", () => {
            const mockItemId = '1';

            expect(() => {
                ItemBusinessRules.validateExistingItem(sampleItem, mockItemId);
            }).not.toThrow();
        })
    })

    describe("validateUniqueItem", () => {
        it("should combine quantities for duplicate item names", () => {
            const mockItems = [sampleItem];
            const result = ItemBusinessRules.validateUniqueItem("Sample Item", 5, mockItems);

            expect(result).toEqual(sampleItem);
            expect(result.quantity).toBe(15);
        });

        it("should return null if no duplicate item is found", () => {
            const mockItems = [sampleItem];
            const result = ItemBusinessRules.validateUniqueItem("Nonexistent Item", 5, mockItems);

            expect(result).toBeNull();
        });
    });

    describe("validateAndBorrowItem", () => {
        it("should throw an error if borrow quantity is invalid", () => {
            expect(() => {
                ItemBusinessRules.validateAndBorrowItem(sampleItem, 0);
            }).toThrow(BadRequestException);
        });

        it("should throw an error if borrow quantity exceeds available stock", () => {
            expect(() => {
                ItemBusinessRules.validateAndBorrowItem(sampleItem, 11);
            }).toThrow(BadRequestException);
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
            }).toThrow(BadRequestException);
        });

        it("should throw an error if return quantity exceeds borrowed quantity", () => {
            expect(() => {
                ItemBusinessRules.validateAndReturnItem(sampleItem, 3);
            }).toThrow(BadRequestException);
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
