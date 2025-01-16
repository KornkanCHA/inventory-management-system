import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO (Data Transfer Object) for updating an item in the inventory.
 * This class defines the properties that can be updated for an item.
 */
export class UpdateItemDto {

  /**
   * The name of the item.
   * This field is optional and can be updated with a new value.
   * @example 'iPad Gen 8'
   */
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'The name of the item',
    example: 'iPad Gen 8',
  })
  name?: string;

  /**
   * A brief description of the item.
   * This field is optional and can be updated with a new value.
   * @example 'Touch, draw, and type on one magical device.'
   */
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: 'A brief description of the item',
    example: 'Touch, draw, and type on one magical device.',
  })
  description?: string;

  /**
   * The number of items available to borrow.
   * This field is optional and can be updated with a new quantity.
   * It must be an integer and cannot be less than 0.
   * @example 10
   */
  @IsOptional()
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(0, { message: 'Quantity must be at least 0' })
  @ApiPropertyOptional({
    description: 'The number of items to borrow',
    example: 10,
  })
  quantity?: number;
}
