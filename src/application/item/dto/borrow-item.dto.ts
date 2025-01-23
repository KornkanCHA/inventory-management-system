import { IsInt, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO for borrowing an item from the inventory.
 * @description This class is used for validating and documenting the data required to borrow an item. 
 * The quantity must be a positive integer with a minimum value of 1.
 */
export class BorrowItemDto {

    /**
     * The number of items to borrow.
     * @example 1
     * @min 1
     * @type {number}
     */
    @IsInt()
    @Min(1, { message: 'borrow quantity must be at least 1' })
    @ApiProperty({
        description: 'The number of item to borrow',
        example: 1,
    })
    quantity: number;
}