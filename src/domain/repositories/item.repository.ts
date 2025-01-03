import { Item } from "../entities/item.entity";
import { CreateItemDto } from "src/application/items/dto/create-item.dto";
import { UpdateItemDto } from "src/application/items/dto/update-item.dto";

export interface ItemRepository {
    findAll(): Promise<Item[]>
    findById(id: string): Promise<Item | null> 
    create(crateItemDto: CreateItemDto): Promise<Item>
    update(id: string, updateItemDto: UpdateItemDto): Promise<void>
    delete(id: string): Promise<void>
    search(query: string, sortBy: string, order: 'ASC' | 'DESC'): Promise<Item[]>
}
  
  