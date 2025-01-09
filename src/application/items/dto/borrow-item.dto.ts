import { IsInt, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BorrowItemDto {
    id: string;

    @ApiProperty({ example: 4 })
    @IsInt()
    @Min(1, { message: 'borrow quantity must be at least 1' })
    quantity: number;
}