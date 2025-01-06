import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { ItemBusinessRules } from "src/domain/business-rules/item.business-rules";
import { ItemRepository } from "src/interface-adapters/repositories/item.repository";
import { Item } from "src/domain/entities/item.entity";

@Injectable()
export class BorrowItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    async execute(id: string, quantity: number): Promise<Item> {
        const item = await this.itemRepository.findById(id);
        if (!item) {
            throw new NotFoundException(`Item with id ${id} not found`);
        }
        
        try {
            const updatedItem = ItemBusinessRules.borrowItem(item, quantity);
            await this.itemRepository.update(id, updatedItem);
            return updatedItem;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
            
    }
}