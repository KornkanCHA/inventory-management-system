import { IsString, IsEnum, IsOptional, IsNotEmpty, isEnum } from 'class-validator';

export class CreateItemDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(['Available', 'Unavailable'], {message: "status must be 'Available' or 'Unavailable'"})
    status: 'Available' | 'Unavailable' = 'Available';
}