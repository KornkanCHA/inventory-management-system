import { Test, TestingModule } from '@nestjs/testing';
import { ItemController } from './item.controller';
import { CreateItemUseCase } from 'src/application/items/use-cases/create-item.use-case';
import { GetItemsUseCase } from 'src/application/items/use-cases/find-items.use-case';
import { GetItemByIdUseCase } from 'src/application/items/use-cases/find-item-by-id.use-case';
import { UpdateItemUseCase } from 'src/application/items/use-cases/update-item.use-case';
import { DeleteItemUseCase } from 'src/application/items/use-cases/delete-item.use-case';
import { SearchItemUseCase } from 'src/application/items/use-cases/search-item.use-case';
import { BorrowItemUseCase } from 'src/application/items/use-cases/borrow-item.use-case';
import { ReturnItemUseCase } from 'src/application/items/use-cases/return-item.use-case';
import { CreateItemDto } from 'src/application/items/dto/create-item.dto';
import { UpdateItemDto } from 'src/application/items/dto/update-item.dto';
import { BorrowItemDto } from 'src/application/items/dto/borrow-item.dto';
import { ReturnItemDto } from 'src/application/items/dto/return-item.dto';
import { Item } from 'src/domain/entities/item.entity';

describe('ItemController', () => {
  let controller: ItemController;
  let mockItem: Item;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        { provide: CreateItemUseCase, useValue: { execute: jest.fn() } },
        { provide: GetItemsUseCase, useValue: { execute: jest.fn() } },
        { provide: GetItemByIdUseCase, useValue: { execute: jest.fn() } },
        { provide: UpdateItemUseCase, useValue: { execute: jest.fn() } },
        { provide: DeleteItemUseCase, useValue: { execute: jest.fn() } },
        { provide: SearchItemUseCase, useValue: { execute: jest.fn() } },
        { provide: BorrowItemUseCase, useValue: { execute: jest.fn() } },
        { provide: ReturnItemUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<ItemController>(ItemController);

    // Mock Data
    mockItem = {
      item_id: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Sample Item',
      description: "Test Item",
      quantity: 10,
      borrowedQuantity: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    } as Item;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create an item', async () => {
      const createItemDto: CreateItemDto = { name: 'Test Item', quantity: 5 };
      jest.spyOn(controller['createItemUseCase'], 'execute').mockResolvedValue(mockItem);

      const result = await controller.create(createItemDto);

      expect(result).toEqual(mockItem);
      expect(controller['createItemUseCase'].execute).toHaveBeenCalledWith(createItemDto);
    });
  });

  describe('findAll', () => {
    it('should return all items', async () => {
      jest.spyOn(controller['getItemsUseCase'], 'execute').mockResolvedValue([mockItem]);

      const result = await controller.findAll();

      expect(result).toEqual([mockItem]);
      expect(controller['getItemsUseCase'].execute).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should return an item by ID', async () => {
      jest.spyOn(controller['getItemByIdUseCase'], 'execute').mockResolvedValue(mockItem);

      const result = await controller.findById(mockItem.item_id);

      expect(result).toEqual(mockItem);
      expect(controller['getItemByIdUseCase'].execute).toHaveBeenCalledWith(mockItem.item_id);
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const updateItemDto: UpdateItemDto = { name: 'Updated Item', quantity: 15 };
      jest.spyOn(controller['updateItemUseCase'], 'execute').mockResolvedValue(mockItem);

      const result = await controller.update(mockItem.item_id, updateItemDto);

      expect(result).toEqual(mockItem);
      expect(controller['updateItemUseCase'].execute).toHaveBeenCalledWith(mockItem.item_id, updateItemDto);
    });
  });

  describe('delete', () => {
    it('should delete an item', async () => {
      jest.spyOn(controller['deleteItemUseCase'], 'execute').mockResolvedValue({ message: 'Deleted' });

      const result = await controller.delete(mockItem.item_id);

      expect(result).toEqual({ message: 'Deleted' });
      expect(controller['deleteItemUseCase'].execute).toHaveBeenCalledWith(mockItem.item_id);
    });
  });

  describe('borrow', () => {
    it('should borrow an item', async () => {
      const borrowItemDto: BorrowItemDto = { quantity: 2 };
      jest.spyOn(controller['borrowItemUseCase'], 'execute').mockResolvedValue(mockItem);

      const result = await controller.borrow(mockItem.item_id, borrowItemDto);

      expect(result).toEqual(mockItem);
      expect(controller['borrowItemUseCase'].execute).toHaveBeenCalledWith(mockItem.item_id, borrowItemDto);
    });
  });

  describe('return', () => {
    it('should return an item', async () => {
      const returnItemDto: ReturnItemDto = { quantity: 2 };
      jest.spyOn(controller['returnItemUseCase'], 'execute').mockResolvedValue(mockItem);

      const result = await controller.return(mockItem.item_id, returnItemDto);

      expect(result).toEqual(mockItem);
      expect(controller['returnItemUseCase'].execute).toHaveBeenCalledWith(mockItem.item_id, returnItemDto);
    });
  });

  describe('search', () => {
    it('should search for items', async () => {
      const query = 'Sample';
      const sortBy = 'name';
      const order: 'ASC' | 'DESC' = 'ASC';

      jest.spyOn(controller['searchItemUseCase'], 'execute').mockResolvedValue([mockItem]);

      const result = await controller.search(query, sortBy, order);

      expect(result).toEqual([mockItem]);
      expect(controller['searchItemUseCase'].execute).toHaveBeenCalledWith(query, sortBy, order);
    });
  });
});
