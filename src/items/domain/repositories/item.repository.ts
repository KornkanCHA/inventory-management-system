import { Item } from "../entities/item.entity";
import { CreateItemDto } from "src/items/application/dto/create-item.dto";
import { UpdateItemDto } from "src/items/application/dto/update-item.dto";

/**
 * Interface for the ItemRepository.
 * @description This interface defines the contract for repository operations related to items in the database.
 */
export interface ItemRepository {
  
    /**
     * Retrieves all items from the database.
     * @returns {Promise<Item[]>} A promise that resolves to an array of all items.
     */
    findAll(): Promise<Item[]>;

    /**
     * Retrieves a specific item by its ID.
     * @param {string} item_id - The ID of the item to retrieve.
     * @returns {Promise<Item | null>} A promise that resolves to the item with the specified ID, or null if not found.
     */
    findById(item_id: string): Promise<Item | null>;

    /**
     * Creates a new item in the database.
     * @param {CreateItemDto} crateItemDto - The DTO containing the data of the item to create.
     * @returns {Promise<Item>} A promise that resolves to the newly created item.
     */
    create(crateItemDto: CreateItemDto): Promise<Item>;

    /**
     * Updates an existing item in the database.
     * @param {string} item_id - The ID of the item to update.
     * @param {UpdateItemDto} updateItemDto - The DTO containing the updated data for the item.
     * @returns {Promise<void>} A promise that resolves once the item has been updated.
     */
    update(item_id: string, updateItemDto: UpdateItemDto): Promise<void>;

    /**
     * Deletes an item from the database by ID.
     * @param {string} item_id - The ID of the item to delete.
     * @returns {Promise<void>} A promise that resolves once the item has been deleted.
     */
    delete(item_id: string): Promise<void>;

    /**
     * Searches for items based on a query string and sorting options.
     * @param {string} query - The search query to find matching items.
     * @param {string} sortBy - The field by which to sort the results.
     * @param {'ASC' | 'DESC'} - The order in which to sort the results.
     * @returns {Promise<Item[]>} A promise that resolves to an array of items that match the query and sorting options.
     */
    search(query: string, sortBy: string, order: 'ASC' | 'DESC'): Promise<Item[]>;
}