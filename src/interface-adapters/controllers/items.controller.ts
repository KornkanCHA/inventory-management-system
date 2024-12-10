import { Controller, Get, Post, Patch, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateItemDto } from 'src/application/items/dto/create-item.dto';
import { UpdateItemDto } from 'src/application/items/dto/update-item.dto';
import { CreateItemUseCase } from 'src/application/items/use-cases/create-item.use-case';
import { GetItemsUseCase } from 'src/application/items/use-cases/get-items.use-case';
import { GetItemByIdUseCase } from 'src/application/items/use-cases/get-item-by-id.use-case';
import { UpdateItemUseCase } from 'src/application/items/use-cases/update-item.use-case';
import { DeleteItemUseCase } from 'src/application/items/use-cases/delete-item.use-case';


@Controller('items')
export class ItemController {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly getItemsUseCase: GetItemsUseCase,
    private readonly getItemByIdUseCase: GetItemByIdUseCase,
    private readonly updateItemUseCase: UpdateItemUseCase,
    private readonly deleteItemUseCase: DeleteItemUseCase,
  ) {}

  @Get()
  getAll() {
    return this.getItemsUseCase.execute();
  }

  @Get(':id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.getItemByIdUseCase.execute(id);
  }

  @Post()
  create(@Body() createItemDto: CreateItemDto) {
    return this.createItemUseCase.execute(createItemDto);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.updateItemUseCase.execute(id, updateItemDto);
  }

  @Delete(':id')
  delete(@Param('id', new ParseUUIDPipe()) id: string): { message: string } {
    return this.deleteItemUseCase.execute(id);
  }
}
