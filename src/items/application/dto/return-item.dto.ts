import { IsInt, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ReturnItemDto {
    @IsInt()
    @Min(1, { message: 'return quantity must be at least 1' })
    @ApiProperty({
        description: 'The number of item to return to the inventory',
        example: 1,
    })
    quantity: number;
}