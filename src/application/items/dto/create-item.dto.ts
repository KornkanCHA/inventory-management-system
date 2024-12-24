import { IsString, IsInt, IsOptional, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateItemDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({default: 1 })
    @IsInt({ message: 'quantity must be an integer' })
    @Min(0, { message: 'quantity must be at least 0' })
    quantity: number = 1;
}