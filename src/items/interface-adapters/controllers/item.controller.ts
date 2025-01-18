import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseUUIDPipe, UseInterceptors, UsePipes} from '@nestjs/common';
import { CreateItemUseCase } from 'src/items/application/use-cases/create-item.use-case';
import { UpdateItemUseCase } from 'src/items/application/use-cases/update-item.use-case';
import { GetItemsUseCase } from 'src/items/application/use-cases/find-items.use-case';
import { GetItemByIdUseCase } from 'src/items/application/use-cases/find-item-by-id.use-case';
import { DeleteItemUseCase } from 'src/items/application/use-cases/delete-item.use-case';
import { SearchItemUseCase } from 'src/items/application/use-cases/search-item.use-case';
import { BorrowItemUseCase } from 'src/items/application/use-cases/borrow-item.use-case';
import { ReturnItemUseCase } from 'src/items/application/use-cases/return-item.use-case';
import { CreateItemDto } from 'src/items/application/dto/create-item.dto';
import { UpdateItemDto } from 'src/items/application/dto/update-item.dto';
import { BorrowItemDto } from 'src/items/application/dto/borrow-item.dto';
import { ReturnItemDto } from 'src/items/application/dto/return-item.dto';
import { Item } from 'src/items/domain/entities/item.entity';
import { ApiOperation, ApiResponse, ApiQuery, ApiTags, ApiParam } from '@nestjs/swagger';
import { ResponseInterceptor } from '../interceptors/response.interceptor';
import { ValidationPipe } from '@nestjs/common';

/**
 * Controller for managing inventory items.
 * @description endpoints for creating, retrieving, updating, deleting, searching, borrowing, and returning items.
 */
@Controller('items')
@UseInterceptors(ResponseInterceptor)
@UsePipes(ValidationPipe)
@ApiTags('Items')
export class ItemController {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly getItemsUseCase: GetItemsUseCase,
    private readonly getItemByIdUseCase: GetItemByIdUseCase,
    private readonly updateItemUseCase: UpdateItemUseCase,
    private readonly deleteItemUseCase: DeleteItemUseCase,
    private readonly searchItemUseCase: SearchItemUseCase,
    private readonly borrowItemUseCase: BorrowItemUseCase,
    private readonly returnItemUseCase: ReturnItemUseCase
  ) {}

  /**
   * Search for items by a query.
   * @param {string} query - The search term to filter items.
   * @param {string} [sortBy] - The field to sort the results (optional).
   * @param {('ASC' | 'DESC')} [order='ASC'] - The sort order, either 'ASC' or 'DESC' (optional, default: 'ASC').
   * @returns {Promise<Item[]>} A list of items matching the search criteria.
   */
  @Get('search')
  @ApiOperation({
    summary: 'Search for items',
    description: 'Search items by query with optional sorting and ordering.',
  })
  @ApiQuery({ name: 'query', type: String, description: 'Search term used to find items', required: true, example: "mo"})
  @ApiQuery({ name: 'sortBy', type: String, description: 'Field to sort the results by (optional)', required: false, example: "quantity"})
  @ApiQuery({ name: 'order', enum: ['ASC', 'DESC'], description: 'Sort order, either ascending or descending (optional)', required: false })
  @ApiResponse({ status: 200, description: 'List of items matching the search query', type: [Item] })
  async search(
    @Query('query') query: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Item[]> {
    return this.searchItemUseCase.execute(query, sortBy, order);
  }

  /**
   * Get all items.
   * @returns {Promise<Item[]>} A list of all items.
   */
  @Get()
  @ApiOperation({
    summary: 'Get all items',
    description: 'Fetch a list of all available items.',
  })
  @ApiResponse({ status: 200, description: 'A list of all items' })
  async findAll(): Promise<Item[]> {
    return this.getItemsUseCase.execute();
  }

  /**
   * Get item by ID.
   * @param {string} item_id - The unique ID of the item.
   * @returns {Promise<Item>} The details of the requested item.
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get item by ID',
    description: 'Fetch a specific item by ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the item',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @ApiResponse({ status: 200, description: 'Item details retrieved successfully' })
  async findById(@Param('id', ParseUUIDPipe) item_id: string): Promise<Item> {
    return this.getItemByIdUseCase.execute(item_id);
  }

  /**
   * Create a new item.
   * @param {CreateItemDto} createItemDto - The details of the item to create.
   * @returns {Promise<Item>} The created item.
   */
  @Post()
  @ApiOperation({
    summary: 'Create new item',
    description: 'Create a new item in the inventory.',
  })
  @ApiResponse({ status: 201, description: 'The item has been created successfully' })
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.createItemUseCase.execute(createItemDto);
  }

  /**
   * Update an item by ID.
   * @param {string} item_id - The unique ID of the item to update.
   * @param {UpdateItemDto} updateItemDto - The new details for the item.
   * @returns {Promise<Item>} The updated item.
   */
  @Patch(':id')
  @ApiOperation({
    summary: 'Update item',
    description: 'Update an existing item by ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the item',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @ApiResponse({ status: 200, description: 'The item has been updated successfully' })
  async update(
    @Param('id', ParseUUIDPipe) item_id: string,
    @Body() updateItemDto: UpdateItemDto,
  ): Promise<Item> {
    return this.updateItemUseCase.execute(item_id, updateItemDto);
  }

  /**
   * Delete an item by ID.
   * @param {string} item_id - The unique ID of the item to delete.
   * @returns {Promise<Object>} A confirmation message of the deletion.
   */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete item',
    description: 'Delete an item by ID.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the item',
    example: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  })
  @ApiResponse({ status: 200, description: 'Item has been deleted successfully' })
  async delete(@Param('id', ParseUUIDPipe) item_id: string): Promise<Object> {
    return this.deleteItemUseCase.execute(item_id);
  }

  /**
   * Borrow an item.
   * @param {string} item_id - The unique ID of the item to borrow.
   * @param {BorrowItemDto} borrowItemDto - The details of the borrowing request.
   * @returns {Promise<Item>} The updated item after borrowing.
   */
  @Patch(':id/borrow')
  @ApiOperation({
    summary: 'Borrow item',
    description: 'Borrow a specified quantity of an item from the inventory.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'Item borrowed successfully' })
  async borrow(
    @Param('id', ParseUUIDPipe) item_id: string,
    @Body() borrowItemDto: BorrowItemDto
  ): Promise<Item> {
    return this.borrowItemUseCase.execute(item_id, borrowItemDto);
  }

  /**
   * Return a borrowed item.
   * @param {string} item_id - The unique ID of the item to return.
   * @param {ReturnItemDto} returnItemDto - The details of the return request.
   * @returns {Promise<Item>} The updated item after returning.
   */
  @Patch(':id/return')
  @ApiOperation({
    summary: 'Return item',
    description: 'Return a borrowed item to the inventory.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The unique identifier of the item',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({ status: 200, description: 'Item returned successfully' })
  async return(
    @Param('id', ParseUUIDPipe) item_id: string,
    @Body() returnItemDto: ReturnItemDto
  ): Promise<Item> {
    return this.returnItemUseCase.execute(item_id, returnItemDto);
  } 
}
