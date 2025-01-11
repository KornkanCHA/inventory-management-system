import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { ItemBusinessRules } from "src/domain/business-rules/item.business-rules";
import { ItemRepositoryImplement } from "src/interface-adapters/repositories/item.repository.implement";
import { Item } from "src/domain/entities/item.entity";
import { BorrowItemDto } from "../dto/borrow-item.dto";

@Injectable()
export class BorrowItemUseCase {
    constructor(private readonly itemRepository: ItemRepositoryImplement) {}

    async execute(item_id: string, borrowItemDto: BorrowItemDto): Promise<Item> {
        const item = await this.itemRepository.findById(item_id);
        if (!item) {
            throw new NotFoundException(`Item with id ${item_id} not found`);
        }
        
        try {
            ItemBusinessRules.validateBorrowItem(item, borrowItemDto.quantity);
            const updatedItem = ItemBusinessRules.executeBorrowItem(item, borrowItemDto.quantity);
            await this.itemRepository.update(item_id, updatedItem);
            return updatedItem;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}