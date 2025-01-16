import { Item } from "../entities/item.entity";
import { CreateItemDto } from "src/items/application/dto/create-item.dto";
import { UpdateItemDto } from "src/items/application/dto/update-item.dto";

export interface ItemRepository {
    findAll(): Promise<Item[]>
    findById(item_id: string): Promise<Item | null> 
    create(crateItemDto: CreateItemDto): Promise<Item>
    update(item_id: string, updateItemDto: UpdateItemDto): Promise<void>
    delete(item_id: string): Promise<void>
    search(query: string, sortBy: string, order: 'ASC' | 'DESC'): Promise<Item[]>
}
  
  