import { IsString, IsOptional, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateItemDto {
    @ApiPropertyOptional({ example: "Macbook Air M1" })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ example: "8GB, SSD 512GB" })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsInt({ message: 'quantity must be an integer' })
    @Min(0, { message: 'quantity must be at least 0' })
    @IsOptional()
    quantity: number;
}