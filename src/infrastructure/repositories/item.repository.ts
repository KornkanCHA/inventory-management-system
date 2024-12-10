import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from 'src/domain/entities/item.entity';
import { initialItems } from '../data/initial-item-data';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ItemRepository {
  private items: Item[] = [...initialItems];

  generateId(): string {
    return uuidv4();
  }

  create(item: Item): Item {
    this.items.push(item);
    return item;
  }

  getAll(): Item[] {
    return this.items;
  }

  getById(id: string): Item {
    const item = this.items.find(item => item.id === id);
    return item;
  }

  update(updatedItem: Item): Item {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    this.items[index] = updatedItem;
    return updatedItem;
  }

  delete(id: string): void {
    const index = this.items.findIndex(item => item.id === id);
    this.items.splice(index, 1);
  }
}
