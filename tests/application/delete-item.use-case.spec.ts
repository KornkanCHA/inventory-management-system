import { Test, TestingModule } from '@nestjs/testing';
import { DeleteItemUseCase } from 'src/application/items/use-cases/delete-item.use-case';
import { ItemRepository } from 'src/infrastructure/repositories/item.repository';
import { NotFoundException } from '@nestjs/common';
import { Item } from 'src/domain/entities/item.entity';

describe('DeleteItemUseCase', () => {
  let deleteItemUseCase: DeleteItemUseCase;
  let itemRepository: jest.Mocked<ItemRepository>;

  beforeEach(async () => {
    const mockRepository = {
      getById: jest.fn(),
      delete: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteItemUseCase,
        {
          provide: ItemRepository,
          useValue: mockRepository
        }
      ]
    }).compile();

    deleteItemUseCase = module.get<DeleteItemUseCase>(DeleteItemUseCase);
    itemRepository = module.get<ItemRepository>(ItemRepository) as jest.Mocked<ItemRepository>;
  });

  it('should delete an item successful', () => {
    const itemId = '1';
    const item = new Item(itemId, 'Item Name', 'Item Description', 'Available', new Date(), new Date());

    itemRepository.getById.mockReturnValue(item);
    itemRepository.delete.mockReturnValue(undefined);

    const result = deleteItemUseCase.execute(itemId);

    expect(result).toEqual({ message: 'Delete successful' });
  });

  it('should throw NotFoundException', () => {
    const itemId = '1';

    itemRepository.getById.mockReturnValue(undefined);

    expect(() => deleteItemUseCase.execute(itemId)).toThrow(
      new NotFoundException(`Item with ID ${itemId} not found`)
    );
  });
});
