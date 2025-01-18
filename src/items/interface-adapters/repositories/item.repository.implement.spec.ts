import { Test, TestingModule } from '@nestjs/testing';
import { ItemRepositoryImplement } from './item.repository.implement';
import { Item } from '../../domain/entities/item.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateItemDto } from 'src/items/application/dto/create-item.dto';
import { UpdateItemDto } from 'src/items/application/dto/update-item.dto';
import { Like } from 'typeorm';

describe('ItemRepositoryImplement', () => {
  let itemRepository: ItemRepositoryImplement;

  const mockItemRepository = {
    find: jest.fn(),
    findOneBy: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockItem: Item = {
    item_id: '1',
    name: 'Test Item',
    description: 'Test Description',
    quantity: 10,
    borrowedQuantity: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemRepositoryImplement,
        {
          provide: getRepositoryToken(Item),
          useValue: mockItemRepository,
        },
      ],
    }).compile();

    itemRepository = module.get<ItemRepositoryImplement>(ItemRepositoryImplement);
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      mockItemRepository.find.mockResolvedValue([mockItem]);
      const result = await itemRepository.findAll();
      expect(result).toEqual([mockItem]);
    });
  });

  describe('findById', () => {
    it('should return an item by id', async () => {
      mockItemRepository.findOneBy.mockResolvedValue(mockItem);
      const result = await itemRepository.findById('1');
      expect(result).toEqual(mockItem);
    });

    it('should return null if item not found', async () => {
      mockItemRepository.findOneBy.mockResolvedValue(null);
      const result = await itemRepository.findById('999');
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and return a new item', async () => {
      const createItemDto: CreateItemDto = {
        name: 'New Item',
        description: 'New Description',
        quantity: 1
      };
      mockItemRepository.create.mockReturnValue(createItemDto);
      mockItemRepository.save.mockResolvedValue(mockItem);

      const result = await itemRepository.create(createItemDto);
      expect(result).toEqual(mockItem);
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const updateItemDto: UpdateItemDto = {
        name: 'Updated Item',
        description: 'Updated Description',
      };
      mockItemRepository.update.mockResolvedValue(undefined);

      await itemRepository.update('1', updateItemDto);
      expect(mockItemRepository.update).toHaveBeenCalledWith('1', updateItemDto);
    });
  });

  describe('delete', () => {
    it('should delete an item', async () => {
      mockItemRepository.delete.mockResolvedValue(undefined);
      await itemRepository.delete('1');
      expect(mockItemRepository.delete).toHaveBeenCalledWith('1');
    });
  });

  describe('search', () => {
    it('should return an array of items matching the query', async () => {
      const query = 'test';
      const sortBy = 'name';
      const order = 'ASC';

      mockItemRepository.find.mockResolvedValue([mockItem]);

      const result = await itemRepository.search(query, sortBy, order);
      expect(mockItemRepository.find).toHaveBeenCalledWith({
        where: { name: Like(`%${query}%`) },
        order: { [sortBy]: order },
      });
      expect(result).toEqual([mockItem]);
    });

    it('should return an empty array if no items match the query', async () => {
      const query = 'not found';
      const sortBy = 'name';
      const order = 'ASC';

      mockItemRepository.find.mockResolvedValue([]);

      const result = await itemRepository.search(query, sortBy, order);
      expect(result).toEqual([]);
    })    
  });
});
