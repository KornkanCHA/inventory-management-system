import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../domain/entities/item.entity';
import { CreateItemDto } from 'src/application/items/dto/create-item.dto';
import { UpdateItemDto } from 'src/application/items/dto/update-item.dto';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findById(id: string): Promise<Item | null> {
    return await this.itemRepository.findOneBy({ id });
  }

  async create(crateItemDto: CreateItemDto): Promise<Item> {
    const newItem = await this.itemRepository.create(crateItemDto);
    return this.itemRepository.save(newItem);
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<void> {
    await this.itemRepository.update(id, updateItemDto);
  }

  async delete(id: string): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
