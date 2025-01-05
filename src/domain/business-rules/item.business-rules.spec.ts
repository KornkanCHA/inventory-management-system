import { Item } from "../entities/item.entity";
import { ItemBusinessRules } from "./item.business-rules";

describe('ItemBusinessRules.validateUniqueItem', () => {
    it('should return the existing item and update quantity if the name is duplicated', () => {
        const existingItems: Item[] = [
            {
                id: '5fc0fe23-d55a-44b8-88d8-21171a4df6c1',
                name: 'Macbook',
                description: 'Chip M1',
                quantity: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        const newItemName = 'Macbook';
        const newItemQuantity = 4;

        const result = ItemBusinessRules.validateUniqueItem(newItemName, newItemQuantity, existingItems);

        expect(result).not.toBeNull();
        expect(result.name).toBe('Macbook');
        expect(result.quantity).toBe(9);
    });

    it('should return null if not found duplicate item', () => {
        const existingItems: Item[] = [
            {
                id: '5fc0fe23-d55a-44b8-88d8-21171a4df6c1',
                name: 'Macbook',
                description: 'Chip M1',
                quantity: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];

        const newItemName = 'iPad';
        const newItemQuantity = 4;

        const result = ItemBusinessRules.validateUniqueItem(newItemName, newItemQuantity, existingItems);

        expect(result).toBe(null)
    })
});