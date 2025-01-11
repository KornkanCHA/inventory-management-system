import { IsInt, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BorrowItemDto {
    @IsInt()
    @Min(1, { message: 'borrow quantity must be at least 1' })
    @ApiProperty({
        description: 'The number of item to borrow',
        example: 2,
    })
    quantity: number;
}