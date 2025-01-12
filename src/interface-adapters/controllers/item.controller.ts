import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseUUIDPipe} from '@nestjs/common';
import { CreateItemUseCase } from 'src/application/items/use-cases/create-item.use-case';
import { GetItemsUseCase } from 'src/application/items/use-cases/get-items.use-case';
import { GetItemByIdUseCase } from 'src/application/items/use-cases/get-item-by-id.use-case';
import { UpdateItemUseCase } from 'src/application/items/use-cases/update-item.use-case';
import { DeleteItemUseCase } from 'src/application/items/use-cases/delete-item.use-case';
import { SearchItemUseCase } from 'src/application/items/use-cases/search-item.use-case';
import { BorrowItemUseCase } from 'src/application/items/use-cases/borrow-item.use-case';
import { ReturnItemUseCase } from 'src/application/items/use-cases/return-item.use-case';
import { CreateItemDto } from 'src/application/items/dto/create-item.dto';
import { UpdateItemDto } from 'src/application/items/dto/update-item.dto';
import { Item } from 'src/domain/entities/item.entity';
import { BorrowItemDto } from 'src/application/items/dto/borrow-item.dto';
import { ReturnItemDto } from 'src/application/items/dto/return-item.dto';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller('items')
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

  @Get('search')
  @ApiOperation({
    summary: 'Search for items',
    description: 'Search items by query with optional sorting and ordering.',
  })
  @ApiQuery({ name: 'query', type: String, description: 'Search term used to find items', required: true, example: "mo"})
  @ApiQuery({ name: 'sortBy', type: String, description: 'Field to sort the results by (optional)', required: false, example: "quantity"})
  @ApiQuery({ name: 'order', enum: ['ASC', 'DESC'], description: 'Sort order, either ascending or descending (optional)', required: false })
  @ApiResponse({ status: 200, description: 'List of items matching the search query' })
  async search(
    @Query('query') query: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Item[]> {
    return this.searchItemUseCase.execute(query, sortBy, order);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all items',
    description: 'Fetch a list of all available items.',
  })
  @ApiResponse({ status: 200, description: 'A list of all items' })
  async findAll(): Promise<Item[]> {
    return this.getItemsUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get item by ID',
    description: 'Fetch a specific item by ID.',
  })
  @ApiResponse({ status: 200, description: 'Item details retrieved successfully' })
  async findById(@Param('id', ParseUUIDPipe) item_id: string): Promise<Item> {
    return this.getItemByIdUseCase.execute(item_id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create new item',
    description: 'Create a new item in the inventory.',
  })
  @ApiResponse({ status: 201, description: 'The item has been created successfully' })
  async create(@Body() creteItemDto: CreateItemDto): Promise<Item> {
    return this.createItemUseCase.execute(creteItemDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update item',
    description: 'Update an existing item by ID.',
  })
  @ApiResponse({ status: 200, description: 'The item has been updated successfully' })
  async update(@Param('id', ParseUUIDPipe) item_id: string, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
    const updatedItem = this.updateItemUseCase.execute(item_id, updateItemDto);
    return updatedItem;
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete item',
    description: 'Delete an item by ID.',
  })
  @ApiResponse({ status: 200, description: 'Item has been deleted successfully' })
  async delete(@Param('id', ParseUUIDPipe) item_id: string): Promise<Object> {
    const deletedItem = this.deleteItemUseCase.execute(item_id);
    return deletedItem;
  }

  @Patch(':id/borrow')
  @ApiOperation({
    summary: 'Borrow item',
    description: 'Borrow a specified quantity of an item from the inventory.',
  })
  @ApiResponse({ status: 200, description: 'Item borrowed successfully' })
  async borrow(
    @Param('id', ParseUUIDPipe) item_id: string,
    @Body() borrowItemDto: BorrowItemDto
  ): Promise<Object> {
    const updatedItem = await this.borrowItemUseCase.execute(item_id, borrowItemDto);
    return {
      message: `Item borrowed successfully`,
      item: {
        item_id: updatedItem.item_id,
        name: updatedItem.name,
        quantity: updatedItem.quantity,
        borrowedQuantity: updatedItem.borrowedQuantity
      }
    };
  }

  @Patch(':id/return')
  @ApiOperation({
    summary: 'Return item',
    description: 'Return a borrowed item to the inventory.',
  })
  @ApiResponse({ status: 200, description: 'Item returned successfully' })
  async return(
    @Param('id', ParseUUIDPipe) item_id: string,
    @Body() returnItemDto: ReturnItemDto
  ): Promise<Object> {
    const updatedItem = await this.returnItemUseCase.execute(item_id, returnItemDto);
    return {
      message: `Item returned successfully`,
      item: {
        item_id: updatedItem.item_id,
        name: updatedItem.name,
        quantity: updatedItem.quantity,
        borrowedQuantity: updatedItem.borrowedQuantity
      }
    };
  } 
}

