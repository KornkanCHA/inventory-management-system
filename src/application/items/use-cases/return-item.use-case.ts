import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { ItemBusinessRules } from "src/domain/business-rules/item.business-rules";
import { ItemRepositoryImplement } from "src/interface-adapters/repositories/item.repository.implement";
import { Item } from "src/domain/entities/item.entity";
import { ReturnItemDto } from "../dto/return-item.dto";

@Injectable()
export class ReturnItemUseCase {
    constructor(private readonly itemRepository: ItemRepositoryImplement) {}

    async execute(item_id: string, returnItemDto: ReturnItemDto): Promise<Item> {
        const item = await this.itemRepository.findById(item_id);
        if (!item) {
            throw new NotFoundException(`Item with id ${item_id} not found`);
        }
        try {
            const updatedItem = ItemBusinessRules.validateAndReturnItem(item, returnItemDto.quantity);
            await this.itemRepository.update(item_id, updatedItem);
            return updatedItem
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}