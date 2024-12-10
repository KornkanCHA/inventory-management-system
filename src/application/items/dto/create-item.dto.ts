import { IsString, IsEnum, IsOptional, IsNotEmpty, isEnum } from 'class-validator';
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

    @ApiProperty({ enum: ['Available', 'Unavailable'], default: 'Available'})
    @IsEnum(['Available', 'Unavailable'], {message: "status must be 'Available' or 'Unavailable'"})
    status: 'Available' | 'Unavailable' = 'Available';
}