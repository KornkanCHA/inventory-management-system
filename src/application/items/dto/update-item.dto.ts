import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateItemDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: 'The name of the item',
        example: 'Laptop',
    })
    name?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: 'A brief description of the item',
        example: 'A powerful gaming laptop with high-end specs.',
    })
    description?: string;

    @IsInt({ message: 'Quantity must be an integer' })
    @Min(0, { message: 'Quantity must be at least 0' })
    @IsOptional()
    @ApiPropertyOptional({
        description: 'The number of item to borrow',
        example: 2,
    })
    quantity?: number;
}