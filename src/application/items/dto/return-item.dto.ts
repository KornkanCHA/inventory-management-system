import { IsInt, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ReturnItemDto {
    @ApiProperty({
        description: 'The unique identifier of the item',
        example: 'd9b1e2ab-9f45-45b1-89b5-820f7243002b',
    })
    id: string;

    @IsInt()
    @Min(1, { message: 'return quantity must be at least 1' })
    @ApiProperty({
        description: 'The number of item to return to the inventory',
        example: 1,
    })
    @IsInt()
    quantity: number;
}