import { Injectable, NotFoundException } from "@nestjs/common";
import { ItemBusinessRules } from "src/domain/business-rules/item.business-rules";
import { ItemRepository } from "src/interface-adapters/repositories/item.repository";

@Injectable()
export class BorrowItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    async execute(id: string, quantity: number): Promise<void> {
        const item = await this.itemRepository.findById(id);
        if (!item) {
            throw new NotFoundException(`Item with id ${id} not found`);
        }
        
        const updatedItem = ItemBusinessRules.borrowItem(item, quantity);
        if (!updatedItem) {
            throw new Error('Not enough quantity available');
        }

        return this.itemRepository.update(id, updatedItem);
    }
}