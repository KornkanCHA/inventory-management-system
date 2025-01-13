import { Test, TestingModule } from "@nestjs/testing";
import { Item } from "src/domain/entities/item.entity";
import { GetItemByIdUseCase } from "src/application/items/use-cases/find-item-by-id.use-case";
import { ItemRepository } from "src/infrastructure/repositories/item.repository";
import { NotFoundException } from "@nestjs/common";

describe('GetItemByIdUseCase', () => {
    let getItemByIdUseCase: GetItemByIdUseCase;
    let itemRepository: jest.Mocked<ItemRepository>;

    beforeEach(async () => {
        const mockRepository = {
            getById: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetItemByIdUseCase,
                {
                    provide: ItemRepository,
                    useValue: mockRepository
                }
            ]
        }).compile()

        getItemByIdUseCase = module.get<GetItemByIdUseCase>(GetItemByIdUseCase);
        itemRepository = module.get<ItemRepository>(ItemRepository) as jest.Mocked<ItemRepository>;
    });

    it('should return the item according to ID', () => {
        const mockItems: Item[] = [
            new Item('1', 'Item 1', 'Description 1', 'Available', new Date(), new Date()),
            new Item('2', 'Item 2', 'Description 2', 'Unavailable', new Date(), new Date())
        ];
        const itemId = '1';

        itemRepository.getById.mockReturnValue(mockItems[0]);

        const result = getItemByIdUseCase.execute(itemId);

        expect(result).toEqual(mockItems[0]);
    });

    it('should throw NotFoundException', () => {
        const itemId = '999';

        itemRepository.getById.mockReturnValue(null);

        expect(() => getItemByIdUseCase.execute(itemId)).toThrow(
            new NotFoundException(`Item with ID ${itemId} not found`)
        );
    });
});


