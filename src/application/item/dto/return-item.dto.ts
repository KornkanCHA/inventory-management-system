import { IsInt, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

/**
 * DTO for returning an item to the inventory.
 * @description This class is used for validating and documenting the data required to return an item. 
 * The quantity must be a positive integer with a minimum value of 1.
 */
export class ReturnItemDto {

    /**
     * The number of items to return to the inventory.
     * @example 1
     * @min 1
     * @type {number}
     */
    @IsInt()
    @Min(1, { message: 'return quantity must be at least 1' })
    @ApiProperty({
        description: 'The number of item to return to the inventory',
        example: 1,
    })
    quantity: number;
}