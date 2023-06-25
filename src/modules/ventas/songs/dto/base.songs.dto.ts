import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, isNotEmpty } from "class-validator";

export class BaseSongsDto{
    @IsNotEmpty()
    @IsString(isStringValidationOption())
    title: string;

    @IsNotEmpty()
    @IsString()
    releaseyear: Date;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    gender: string;
}