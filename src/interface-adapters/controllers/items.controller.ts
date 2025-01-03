import { Controller, Get, Post, Patch, Delete, Body, Param, Query, Headers, ParseUUIDPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CreateItemUseCase } from 'src/application/items/use-cases/create-item.use-case';
import { GetItemsUseCase } from 'src/application/items/use-cases/get-items.use-case';
import { GetItemByIdUseCase } from 'src/application/items/use-cases/get-item-by-id.use-case';
import { UpdateItemUseCase } from 'src/application/items/use-cases/update-item.use-case';
import { DeleteItemUseCase } from 'src/application/items/use-cases/delete-item.use-case';
import { SearchItemUseCase } from 'src/application/items/use-cases/search-item.use-case';
import { CreateItemDto } from 'src/application/items/dto/create-item.dto';
import { UpdateItemDto } from 'src/application/items/dto/update-item.dto';
import { Item } from 'src/domain/entities/item.entity';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly getItemsUseCase: GetItemsUseCase,
    private readonly getItemByIdUseCase: GetItemByIdUseCase,
    private readonly updateItemUseCase: UpdateItemUseCase,
    private readonly deleteItemUseCase: DeleteItemUseCase,
    private readonly searchItemUseCase: SearchItemUseCase
  ) {}

  @Get('search')
  async search(
    @Query('query') query: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC'
  ): Promise<Item[]> {
    try {
      return await this.searchItemUseCase.execute(query, sortBy, order);
    } catch(error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<Item[]> {
    try {
      return await this.getItemsUseCase.execute();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Item> {
    try {
      return await this.getItemByIdUseCase.execute(id);
    } catch (error) {
      if (error.name === 'NotFoundException') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async create(
    @Body() creteItemDto: CreateItemDto,
    @Headers('content-type') contentType: string
  ): Promise<Item> {
    if (!contentType || !contentType.includes('application/json')) {
      throw new HttpException('Request must be in JSON format', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.createItemUseCase.execute(creteItemDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string, 
    @Body() updateItemDto: UpdateItemDto,
    @Headers('content-type') contentType: string
  ): Promise<Item> {
    if (!contentType || !contentType.includes('application/json')) {
      throw new HttpException('Request must be in JSON format', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.updateItemUseCase.execute(id, updateItemDto);
    } catch (error) {
      if (error.name === 'NotFoundException') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<Object> {
    try {
      return await this.deleteItemUseCase.execute(id);
    } catch (error) {
      if (error.name === 'NotFoundException') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}
