import { IsInt, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ReturnItemDto {
    id: string;

    @ApiProperty({ example: 3 })
    @IsInt()
    @Min(1, { message: 'return quantity must be at least 1' })
    quantity: number;
}