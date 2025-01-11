import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateItemDto {
    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: 'The name of the item',
        example: 'iPad',
    })
    name?: string;

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({
        description: 'A brief description of the item',
        example: 'Touch, draw, and type on one magical device.',
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