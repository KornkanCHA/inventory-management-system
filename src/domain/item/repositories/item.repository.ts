import { Item } from "../model/item.model";
import { CreateItemDto } from "src/infrastructure/controllers/dto/create-item.dto";
import { UpdateItemDto } from "src/infrastructure/controllers/dto/update-item.dto";

/**
 * Interface for the ItemRepository.
 * @description This interface defines the contract for repository operations related to items in the database.
 */
export abstract class ItemRepository {
    abstract findAll(): Promise<Item[]>;
    abstract findById(item_id: string): Promise<Item | null>;
    abstract create(crateItemDto: CreateItemDto): Promise<Item>;
    abstract update(item_id: string, updateItemDto: UpdateItemDto): Promise<void>;
    abstract delete(item_id: string): Promise<void>;
    abstract search(query: string, sortBy: string, order: 'ASC' | 'DESC'): Promise<Item[]>;
}