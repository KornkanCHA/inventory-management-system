import { IsString, IsInt, IsOptional, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * DTO for creating an item.
 * @description This class is used for validating and documenting the data required to create an item. 
 * It includes fields for the item's name, description, and quantity.
 */
export class CreateItemDto {
    
    /**
     * The name of the item.
     * @example 'iPad'
     * @type {string}
     */
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'The name of the item',
        example: 'iPad',
    })
    name: string;

    /**
     * A brief description of the item.
     * @optional
     * @example 'Lorem Ipsum.'
     * @type {string}
     */
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'A brief description of the item',
        example: 'Lorem Ipsum.',
    })
    description?: string;

    /**
     * The number of items available.
     * @example 2
     * @min 1
     * @type {number}
     */
    @IsInt({ message: 'Quantity must be an integer' })
    @Min(1, { message: 'Quantity must be at least 1' })
    @ApiProperty({
        description: 'The number of item to borrow',
        example: 2,
    })
    quantity: number;
}
