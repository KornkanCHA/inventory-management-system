import { ItemRepository } from 'src/infrastructure/repositories/item.repository';
import { Item } from 'src/domain/entities/item.entity';

describe('ItemRepository', () => {
  let itemRepository: ItemRepository;

  beforeEach(() => {
    itemRepository = new ItemRepository(); 
  });

  it('should create and retrieve an item', () => {
    const newItem = new Item(
        itemRepository.generateId(),
        'Wireless headphones',
        'Edifier W320TN',
        'Available',
        new Date(),
        new Date()
    );

    const createdItem = itemRepository.create(newItem);

    expect(createdItem).toEqual(newItem);
    expect(itemRepository.getAll()).toContainEqual(newItem);
  });

  it('should get an item by id', () => {
    const exampleItem = itemRepository.getAll()[0];
    const getByIdItem = itemRepository.getById(exampleItem.id);

    expect(getByIdItem).toEqual(exampleItem);
  });

  it('should update an item', () => {
    const exampleItem = itemRepository.getAll()[0];
    const itemToUpdate = new Item(
      exampleItem.id,
      'The new name of this item',
      exampleItem.description,
      exampleItem.status,
      exampleItem.created_at,
      exampleItem.created_at
    );
    const updatedItem = itemRepository.update(itemToUpdate);

    expect(updatedItem).toEqual(itemToUpdate);
  });

  it('should delete an item', () => {
    const itemToDelete = itemRepository.getAll()[0];

    itemRepository.delete(itemToDelete.id);

    expect(itemRepository.getAll()).not.toContainEqual(itemToDelete);
  });
});
