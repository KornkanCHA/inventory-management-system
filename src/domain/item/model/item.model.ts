/**
 * The `Item` model represents an item in the inventory management system.
 * It defines the structure of an item without relying on any specific framework.
 * @description This class serves as a simple model to represent an item.
 */
export class Item {
    item_id: string;
    name: string;
    description?: string;
    quantity: number;
    borrowedQuantity: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        item_id: string,
        name: string,
        description: string,
        quantity: number,
        borrowedQuantity: number = 0,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
        
    ) {
        this.item_id = item_id;
        this.name = name;
        this.quantity = quantity;
        this.borrowedQuantity = borrowedQuantity;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.description = description;
    }
}