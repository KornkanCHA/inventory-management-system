import { IsInt, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BorrowItemDto {
    @ApiProperty({
        description: 'The unique identifier of the item',
        example: 'd9b1e2ab-9f45-45b1-89b5-820f7243002b',
    })
    id: string;

    @IsInt()
    @Min(1, { message: 'borrow quantity must be at least 1' })
    @ApiProperty({
        description: 'The number of item to borrow',
        example: 2,
    })
    quantity: number;
}