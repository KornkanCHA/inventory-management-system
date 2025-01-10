import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'The unique identifier of the item',
    example: 'd9b1e2ab-9f45-45b1-89b5-820f7243002b',
  })
  id: string;

  @Column({ length: 100 })
  @ApiProperty({
    description: 'The name of the item',
    example: 'Laptop',
  })
  name: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: 'A brief description of the item',
    example: 'A powerful gaming laptop with high-end specs.',
    required: false,
    nullable: true
  })
  description?: string;

  @Column({ type: 'int'})
  @ApiProperty({
    description: 'The total quantity of the item available in stock',
    example: 10,
  })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  @ApiProperty({
    description: 'The number of items that are currently borrowed',
    example: 3,
    default: 0,
  })
  borrowedQuantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'The timestamp when the item was created. This field is auto-generated',
    example: '2025-01-10T12:34:56Z',
  })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  @ApiProperty({
    description: 'The timestamp when the item was last updated. This field is auto-generated and updated',
    example: '2025-01-10T12:34:56Z',
  })
  updatedAt: Date;
}
