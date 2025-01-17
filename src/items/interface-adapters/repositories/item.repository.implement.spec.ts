import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Item } from '../../domain/entities/item.entity';
import { ItemRepositoryImplement } from './item.repository.implement';
import { Like } from 'typeorm';

const mockRepository = {
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('ItemRepositoryImplement', () => {
  let itemRepository: ItemRepositoryImplement;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemRepositoryImplement,
        {
          provide: getRepositoryToken(Item),
          useValue: mockRepository,
        },
      ],
    }).compile();

    itemRepository = module.get<ItemRepositoryImplement>(ItemRepositoryImplement);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should have the repository defined', () => {
    expect(itemRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all items', async () => {
      const items = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
      mockRepository.find.mockResolvedValue(items);

      const result = await itemRepository.findAll();
      expect(result).toEqual(items);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array if no items are found', async () => {
      mockRepository.find.mockResolvedValue([]);
      const result = await itemRepository.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('should return an item by id', async () => {
      const id = '123';
      const item = { id, name: 'Item 123' };
      mockRepository.findOneBy.mockResolvedValue(item);

      const result = await itemRepository.findById(id);
      expect(result).toEqual(item);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({ item_id: id });
    });

    it('should return null if item is not found', async () => {
      const id = '999';
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await itemRepository.findById(id);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create and save an item', async () => {
      const dto = { name: 'New Item', quantity: 1 };
      const savedItem = { id: 1, ...dto };

      mockRepository.create.mockReturnValue(savedItem);
      mockRepository.save.mockResolvedValue(savedItem);

      const result = await itemRepository.create(dto);
      expect(result).toEqual(savedItem);
      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(savedItem);
    });
  });

  describe('update', () => {
    it('should update an item', async () => {
      const id = '123';
      const dto = { name: 'Updated Item' };

      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await itemRepository.update(id, dto);
      expect(result).toEqual({ affected: 1 });
      expect(mockRepository.update).toHaveBeenCalledWith(id, dto);
    });

    it('should handle no items being updated', async () => {
      const id = '999';
      const dto = { name: 'Nonexistent Item' };

      mockRepository.update.mockResolvedValue({ affected: 0 });

      const result = await itemRepository.update(id, dto);
      expect(result).toEqual({ affected: 0 });
    });
  });

  describe('delete', () => {
    it('should delete an item by id', async () => {
      const id = '123';

      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await itemRepository.delete(id);
      expect(result).toEqual({ affected: 1 });
      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should handle no items being deleted', async () => {
      const id = '999';

      mockRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await itemRepository.delete(id);
      expect(result).toEqual({ affected: 0 });
    });
  });

  describe('search', () => {
    it('should return items matching the query', async () => {
      const query = 'test';
      const sortBy = 'name';
      const order = 'ASC';
      const items = [{ id: 1, name: 'test item' }];

      mockRepository.find.mockResolvedValue(items);

      const result = await itemRepository.search(query, sortBy, order);
      expect(result).toEqual(items);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { name: Like(`%${query}%`) },
        order: { [sortBy]: order },
      });
    });

    it('should return an empty array if no items match the query', async () => {
      const query = 'notfound';
      const sortBy = 'name';
      const order = 'ASC';

      mockRepository.find.mockResolvedValue([]);

      const result = await itemRepository.search(query, sortBy, order);
      expect(result).toEqual([]);
    });
  });
});
