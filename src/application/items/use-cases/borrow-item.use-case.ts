import { Injectable } from "@nestjs/common";
import { ItemRepository } from "src/interface-adapters/repositories/item.repository";

@Injectable()
export class BrrowItemUseCase {
    constructor(private readonly itemRepository: ItemRepository) {}

    async execute(id: string, quantity: number): Promise<void> {
        const item = await this.itemRepository.findById(id);
        if (!item) {
            throw new Error("Item not found");
        }

        
    }
}