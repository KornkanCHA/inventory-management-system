import { IsString, IsEnum, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateItemDto {
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ enum: ['Available', 'Unavailable']})
    @IsOptional()
    @IsEnum(["Available", "Unavailable"], {message: 'status must be one of the following values: Available, Unavailable'})
    status?: "Available" | "Unavailable";
}