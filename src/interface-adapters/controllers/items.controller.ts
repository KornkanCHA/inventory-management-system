import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CreateItemUseCase } from 'src/application/items/use-cases/create-item.use-case';
import { GetItemsUseCase } from 'src/application/items/use-cases/get-items.use-case';
import { GetItemByIdUseCase } from 'src/application/items/use-cases/get-item-by-id.use-case';
import { UpdateItemUseCase } from 'src/application/items/use-cases/update-item.use-case';
import { DeleteItemUseCase } from 'src/application/items/use-cases/delete-item.use-case';
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
  ) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return this.getItemsUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Item> {
    return this.getItemByIdUseCase.execute(id);
  }

  @Post()
  async create(@Body() creteItemDto: CreateItemDto): Promise<Item> {
    return this.createItemUseCase.execute(creteItemDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto): Promise<void> {
    await this.updateItemUseCase.execute(id, updateItemDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteItemUseCase.execute(id);
  }
}
