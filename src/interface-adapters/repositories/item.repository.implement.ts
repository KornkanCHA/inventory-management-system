import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../domain/entities/item.entity';
import { CreateItemDto } from 'src/application/items/dto/create-item.dto';
import { UpdateItemDto } from 'src/application/items/dto/update-item.dto';
import { ItemRepository } from 'src/domain/repositories/item.repository';

@Injectable()
export class ItemRepositoryImplement implements ItemRepository {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  async findById(item_id: string): Promise<Item | null> {
    return await this.itemRepository.findOneBy({ item_id });
  }

  async create(crateItemDto: CreateItemDto): Promise<Item> {
    const newItem = await this.itemRepository.create(crateItemDto);
    return this.itemRepository.save(newItem);
  }

  async update(item_id: string, updateItemDto: UpdateItemDto): Promise<void> {
    await this.itemRepository.update(item_id, updateItemDto);
  }

  async delete(item_id: string): Promise<void> {
    await this.itemRepository.delete(item_id);
  }

  async search(query: string, sortBy = 'name', order: 'ASC' | 'DESC' = 'ASC'): Promise<Item[]> {
    return this.itemRepository.find({
      where: { name: Like(`%${query}%`) },
      order: { [sortBy]: order }
    });
  }
}
