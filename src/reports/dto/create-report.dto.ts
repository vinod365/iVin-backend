import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateReportDto {
    @IsOptional()
    @IsString()
    note?: string;

    @IsUUID()
    userId: string;
}
