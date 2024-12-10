import { Item } from "src/domain/entities/item.entity";
import { v4 as uuidv4 } from 'uuid';

export const initialItems: Item[] = [
    {
      id: uuidv4(),
      name: 'Macbook Air',
      description: 'Chip M1',
      status: 'Available',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Projector',
      description: '4K resolution',
      status: 'Unavailable',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'iPhone',
      description: 'SE2',
      status: 'Available',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'iPad',
      description: 'Gen 8',
      status: 'Available',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      name: 'Wireless headphones',
      description: 'Noise cancelling',
      status: 'Unavailable',
      created_at: new Date(),
      updated_at: new Date(),
    },
];
