import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../../domain/entities/item.entity';
import { CreateItemDto } from 'src/items/application/dto/create-item.dto';
import { UpdateItemDto } from 'src/items/application/dto/update-item.dto';
import { ItemRepository } from 'src/items/domain/repositories/item.repository';

/**
 * The implementation of the ItemRepository interface, responsible for interacting with the database.
 * @description This class provides methods for performing operations on items in the database. 
 * It uses TypeORM Repository to perform database actions.
 */
@Injectable()
export class ItemRepositoryImplement implements ItemRepository {
    constructor(
      @InjectRepository(Item)
      private readonly itemRepository: Repository<Item>,
    ) {}

    /**
     * Retrieves all items from the database.
     * @returns {Promise<Item[]>} A promise that resolves to an array of all items.
     */
    async findAll(): Promise<Item[]> {
        return await this.itemRepository.find();
    }

    /**
     * Retrieves a specific item by its ID.
     * @param {string} item_id - The ID of the item to retrieve.
     * @returns {Promise<Item | null>} A promise that resolves to the item with the specified ID, or null if not found.
     */
    async findById(item_id: string): Promise<Item | null> {
        return await this.itemRepository.findOneBy({ item_id });
    }

    /**
     * Creates a new item in the database.
     * @param {CreateItemDto} crateItemDto - The DTO containing the data of the item to create.
     * @returns {Promise<Item>} A promise that resolves to the newly created item.
     */
    async create(crateItemDto: CreateItemDto): Promise<Item> {
        const newItem = await this.itemRepository.create(crateItemDto);
        return this.itemRepository.save(newItem);
    }

    /**
     * Updates an existing item in the database.
     * @param {string} item_id - The ID of the item to update.
     * @param {UpdateItemDto} updateItemDto - The DTO containing the updated data for the item.
     * @returns {Promise<void>} A promise that resolves once the item has been updated.
     */
    async update(item_id: string, updateItemDto: UpdateItemDto): Promise<void> {
        await this.itemRepository.update(item_id, updateItemDto);
    }

    /**
     * Deletes an item from the database by ID.
     * @param {string} item_id - The ID of the item to delete.
     * @returns {Promise<void>} A promise that resolves once the item has been deleted.
     */
    async delete(item_id: string): Promise<void> {
        await this.itemRepository.delete(item_id);
    }

    /**
     * Searches for items based on a query string and sorting options.
     * @param {string} query - The search query to find matching items by name.
     * @param {string} [sortBy='name'] - The field by which to sort the results. Defaults to 'name'.
     * @param {'ASC' | 'DESC'} [order='ASC'] - The order in which to sort the results. Defaults to 'ASC'.
     * @returns {Promise<Item[]>} A promise that resolves to an array of items that match the query and sorting options.
     */
    async search(query: string, sortBy = 'name', order: 'ASC' | 'DESC' = 'ASC'): Promise<Item[]> {
        return this.itemRepository.find({
          where: { name: Like(`%${query}%`) },
          order: { [sortBy]: order }
        });
    }
}
