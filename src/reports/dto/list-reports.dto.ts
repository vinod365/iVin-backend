import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator";

export class ListReportsDto {
    @IsOptional()
    @IsString()
    search?: string

    @IsOptional()
    @IsIn(['newest', 'oldest'], {
        message: 'sortBy must be either newest or oldest',
    })
    sortBy?: 'newest' | 'oldest';

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;

}