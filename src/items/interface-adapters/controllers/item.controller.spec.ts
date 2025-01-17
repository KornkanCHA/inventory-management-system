import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
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

describe('ItemController', () => {
  let controller: ItemController;

  const mockItem: Item = {
    item_id: '123e4567-e89b-12d3-a456-426614174000',
    name: 'Mock Item',
    description: 'This is a mock item',
    quantity: 10,
    borrowedQuantity: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const mockCreateItemDto: CreateItemDto = {
    name: 'New Item',
    quantity: 5,
    description: 'New item description',
  };

  const mockUpdateItemDto: UpdateItemDto = {
    name: 'Updated Item',
    quantity: 15,
    description: 'Updated description',
  };

  const mockBorrowItemDto: BorrowItemDto = {
    quantity: 2,
  };

  const mockReturnItemDto: ReturnItemDto = {
    quantity: 2,
  };

  const mockItemUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        { provide: CreateItemUseCase, useValue: mockItemUseCase },
        { provide: UpdateItemUseCase, useValue: mockItemUseCase },
        { provide: GetItemsUseCase, useValue: mockItemUseCase },
        { provide: GetItemByIdUseCase, useValue: mockItemUseCase },
        { provide: DeleteItemUseCase, useValue: mockItemUseCase },
        { provide: SearchItemUseCase, useValue: mockItemUseCase },
        { provide: BorrowItemUseCase, useValue: mockItemUseCase },
        { provide: ReturnItemUseCase, useValue: mockItemUseCase },
      ],
    }).compile();

    controller = module.get<ItemController>(ItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all items', async () => {
      mockItemUseCase.execute.mockResolvedValue([mockItem]);
      const result = await controller.findAll();
      expect(result).toEqual([mockItem]);
    });
  });

  describe('findById', () => {
    it('should return an item by ID', async () => {
      mockItemUseCase.execute.mockResolvedValue(mockItem);
      const result = await controller.findById(mockItem.item_id);
      expect(result).toEqual(mockItem);
    });
  });

  describe('create', () => {
    it('should create a new item', async () => {
      mockItemUseCase.execute.mockResolvedValue(mockItem);
      const result = await controller.create(mockCreateItemDto);
      console.log(result)
      console.log(mockCreateItemDto)
      expect(result).toEqual(mockItem);
    });
  });

  describe('update', () => {
    it('should update an item by ID', async () => {
      mockItemUseCase.execute.mockResolvedValue(mockItem);
      const result = await controller.update(mockItem.item_id, mockUpdateItemDto);
      expect(result).toEqual(mockItem);
    });
  });

  describe('delete', () => {
    it('should delete an item by ID', async () => {
      mockItemUseCase.execute.mockResolvedValue({ message: 'Item deleted successfully' });
      const result = await controller.delete(mockItem.item_id);
      expect(result).toEqual({ message: 'Item deleted successfully' });
    });
  });

  describe('search', () => {
    it('should search items by query', async () => {
      mockItemUseCase.execute.mockResolvedValue([mockItem]);
      const result = await controller.search('mock', 'name', 'ASC');
      expect(result).toEqual([mockItem]);
    });
  });

  describe('borrow', () => {
    it('should borrow an item', async () => {
      mockItemUseCase.execute.mockResolvedValue(mockItem);
      const result = await controller.borrow(mockItem.item_id, mockBorrowItemDto);
      expect(result).toEqual(mockItem);
    });
  });

  describe('return', () => {
    it('should return a borrowed item', async () => {
      mockItemUseCase.execute.mockResolvedValue(mockItem);
      const result = await controller.return(mockItem.item_id, mockReturnItemDto);
      expect(result).toEqual(mockItem);
    });
  });
});
