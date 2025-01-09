import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { ItemBusinessRules } from "src/domain/business-rules/item.business-rules";
import { ItemRepository } from "src/interface-adapters/repositories/item.repository";
import { Item } from "src/domain/entities/item.entity";
import { ReturnItemDto } from "../dto/return-item.dto";

@Injectable()
export class ReturnItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    async execute(returnItemDto: ReturnItemDto): Promise<Item> {
        const item = await this.itemRepository.findById(returnItemDto.id);
        if (!item) {
            throw new NotFoundException(`Item with id ${returnItemDto.id} not found`);
        }
        try {
            ItemBusinessRules.validateReturnItem(item, returnItemDto.quantity);
            const updatedItem = ItemBusinessRules.executeReturnItem(item, returnItemDto.quantity);
            await this.itemRepository.update(returnItemDto.id, updatedItem);
            return updatedItem
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }
}