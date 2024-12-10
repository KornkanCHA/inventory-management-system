import { Test, TestingModule } from '@nestjs/testing';
import { UpdateItemUseCase } from 'src/application/items/use-cases/update-item.use-case';
import { ItemRepository } from 'src/infrastructure/repositories/item.repository';
import { NotFoundException } from '@nestjs/common';
import { Item } from 'src/domain/entities/item.entity';
import { UpdateItemDto } from 'src/application/items/dto/update-item.dto';

describe('UpdateItemUseCase', () => {
  let updateItemUseCase: UpdateItemUseCase;
  let itemRepository: jest.Mocked<ItemRepository>;

  beforeEach(async () => {
    const mockRepository = {
      getById: jest.fn(),
      update: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateItemUseCase,
        {
          provide: ItemRepository,
          useValue: mockRepository
        }
      ]
    }).compile();

    updateItemUseCase = module.get<UpdateItemUseCase>(UpdateItemUseCase);
    itemRepository = module.get<ItemRepository>(ItemRepository) as jest.Mocked<ItemRepository>;
  });

  it('should update an item successfully', () => {
    const itemId = '1';
    const updateItemDto: UpdateItemDto = {
      name: 'Updated Item',
      description: 'Updated Description',
      status: 'Unavailable'
    };

    const existingItem = new Item(
      itemId,
      'Old Item',
      'Old Description',
      'Available',
      new Date(),
      new Date()
    );

    const updatedItem = new Item(
      itemId,
      updateItemDto.name,
      updateItemDto.description,
      updateItemDto.status,
      existingItem.created_at,
      new Date()
    );

    itemRepository.getById.mockReturnValue(existingItem);
    itemRepository.update.mockReturnValue(updatedItem);

    const result = updateItemUseCase.execute(itemId, updateItemDto);

    expect(result).toEqual(updatedItem);
    expect(result.name).toBe(updateItemDto.name);
    expect(result.description).toBe(updateItemDto.description);
    expect(result.status).toBe(updateItemDto.status);
  });

  it('should throw NotFoundException if item does not exist', () => {
    const itemId = '1';
    const updateItemDto: UpdateItemDto = {
      name: 'Updated Item',
      description: 'Updated Description',
      status: 'Unavailable'
    };

    itemRepository.getById.mockReturnValue(undefined);

    expect(() => updateItemUseCase.execute(itemId, updateItemDto)).toThrow(
      new NotFoundException(`Item with ID ${itemId} not found`)
    );
  });
});
