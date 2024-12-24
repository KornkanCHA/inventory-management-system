import { IsString, IsInt, IsOptional, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateItemDto {
    @ApiProperty({ example: "Macbook Air M1" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional({ example: "8GB, SSD 512GB" })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({default: 1 })
    @IsInt({ message: 'quantity must be an integer' })
    @Min(0, { message: 'quantity must be at least 0' })
    quantity: number = 1;
}