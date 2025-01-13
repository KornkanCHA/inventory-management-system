import { Test, TestingModule } from "@nestjs/testing";
import { Item } from "src/domain/entities/item.entity";
import { GetItemsUseCase } from "src/application/items/use-cases/find-items.use-case";
import { ItemRepository } from "src/infrastructure/repositories/item.repository";

describe('GetItemsUseCase', () => {
  let getItemUseCase: GetItemsUseCase;
  let itemRepository: jest.Mocked<ItemRepository>;

  beforeEach(async () => {
    const mockReposity = {
      getAll: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetItemsUseCase,
        {
          provide: ItemRepository,
          useValue: mockReposity
        }
      ]
    }).compile()

    getItemUseCase = module.get<GetItemsUseCase>(GetItemsUseCase);
    itemRepository = module.get<ItemRepository>(ItemRepository) as jest.Mocked<ItemRepository>;
  });

  it('should return all items', () => {
    const mockItems: Item[] = [
      new Item('1', 'Item 1', 'Description 1', 'Available', new Date(), new Date()),
      new Item('2', 'Item 2', 'Description 2', 'Unavailable', new Date(), new Date())
    ];

    itemRepository.getAll.mockReturnValue(mockItems);

    const result = getItemUseCase.execute();
    expect(result).toEqual(mockItems);
  });
});