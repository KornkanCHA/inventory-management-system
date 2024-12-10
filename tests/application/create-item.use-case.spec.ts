import { Test, TestingModule } from '@nestjs/testing';
import { CreateItemUseCase } from 'src/application/items/use-cases/create-item.use-case';
import { ItemRepository } from 'src/infrastructure/repositories/item.repository';
import { CreateItemDto } from 'src/application/items/dto/create-item.dto';
import { Item } from 'src/domain/entities/item.entity';

describe('CreateItemUseCase', () => {
  let createItemUseCase: CreateItemUseCase;
  let itemRepository: jest.Mocked<ItemRepository>;

  beforeEach(async () => {
 
    const mockRepository = {
      generateId: jest.fn(),
      create: jest.fn()
    };
  
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateItemUseCase,
        {
          provide: ItemRepository,
          useValue: mockRepository
        }
      ]
    }).compile();
  
    createItemUseCase = module.get<CreateItemUseCase>(CreateItemUseCase);
    itemRepository = module.get<ItemRepository>(ItemRepository) as jest.Mocked<ItemRepository>;
  });
  

  it('should create and save a new item', () => {
    const mockId = '1';
    const createItemDto: CreateItemDto = {
      name: 'New Item',
      description: 'Description of the item',
      status: 'Available'
    };

    const expectedItem = new Item(
      mockId,
      createItemDto.name,
      createItemDto.description,
      createItemDto.status,
      expect.any(Date),
      expect.any(Date)
    );

    itemRepository.generateId.mockReturnValue(mockId);
    itemRepository.create.mockImplementation(item => item);

    const result = createItemUseCase.execute(createItemDto);

    expect(result).toEqual(expectedItem);
  });
});
