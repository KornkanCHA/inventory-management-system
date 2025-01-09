import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseUUIDPipe, HttpException, HttpStatus, ParseIntPipe} from '@nestjs/common';
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
import { ApiQuery } from '@nestjs/swagger';


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
  @ApiQuery({ name: 'query', type: String, description: 'Search term', required: true })
  @ApiQuery({ name: 'sortBy', type: String, description: 'Field to sort by', required: false })
  @ApiQuery({ name: 'order', enum: ['ASC', 'DESC'], description: 'Sort order (ASC or DESC)', required: false })
  async search(
    @Query('query') query: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Item[]> {
    return this.searchItemUseCase.execute(query, sortBy, order);
  }

  @Get()
  async findAll(): Promise<Item[]> {
    return this.getItemsUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Item> {
    return this.getItemByIdUseCase.execute(id);
  }

  @Post()
  async create(@Body() creteItemDto: CreateItemDto): Promise<Item> {
    return this.createItemUseCase.execute(creteItemDto);
  }

  @Patch(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
    const updatedItem = this.updateItemUseCase.execute(id, updateItemDto);
    return updatedItem;
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<Object> {
    const deletedItem = this.deleteItemUseCase.execute(id);
    return deletedItem;
  }

  @Patch(':id/borrow')
  async borrow(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() borrowItemDto: BorrowItemDto
  ): Promise<Object> {
    try {
      borrowItemDto.id = id;
      const updatedItem = await this.borrowItemUseCase.execute(borrowItemDto);
      return {
        message: `Item borrowed successfully`,
        item: {
          id: updatedItem.id,
          name: updatedItem.name,
          quantity: updatedItem.quantity,
          borrowedQuantity: updatedItem.borrowedQuantity
        }
      }
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Patch(':id/return')
  async return(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() returnItemDto: ReturnItemDto
  ): Promise<Object> {
    try {
      returnItemDto.id = id;
      const updatedItem = await this.returnItemUseCase.execute(returnItemDto);
      return {
        message: `Item returned successfully`,
        item: {
          id: updatedItem.id,
          name: updatedItem.name,
          quantity: updatedItem.quantity,
          borrowedQuantity: updatedItem.borrowedQuantity
        }
      }
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }
}
