import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { ItemBusinessRules } from "src/domain/business-rules/item.business-rules";
import { ItemRepository } from "src/interface-adapters/repositories/item.repository";
import { Item } from "src/domain/entities/item.entity";
import { BorrowItemDto } from "../dto/borrow-item.dto";

@Injectable()
export class BorrowItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    async execute(borrowItemDto: BorrowItemDto): Promise<Item> {
        const item = await this.itemRepository.findById(borrowItemDto.id);
        if (!item) {
            throw new NotFoundException(`Item with id ${borrowItemDto.id} not found`);
        }
        
        try {
            ItemBusinessRules.validateBorrowItem(item, borrowItemDto.quantity);
            const updatedItem = ItemBusinessRules.executeBorrowItem(item, borrowItemDto.quantity);
            await this.itemRepository.update(borrowItemDto.id, updatedItem);
            return updatedItem;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}