import { IsString, IsInt, IsOptional, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'The name of the item',
        example: 'iPad',
    })
    name: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'A brief description of the item',
        example: 'Lorem Ipsum.',
    })
    description?: string;

    @IsInt({ message: 'Quantity must be an integer' })
    @Min(0, { message: 'Quantity must be at least 0' })
    @ApiProperty({
        description: 'The number of item to borrow',
        example: 2,
    })
    quantity: number;
}