import { IsString, IsEnum, IsOptional, IsInt } from 'class-validator';

export class UpdateItemDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(["Available", "Unavailable"], {message: 'status must be one of the following values: Available, Unavailable'})
    status?: "Available" | "Unavailable";
}