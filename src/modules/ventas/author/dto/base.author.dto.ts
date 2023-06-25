import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, isNotEmpty } from "class-validator";

export class BaseAuthorDto{
    @IsNotEmpty()
    @IsString(isStringValidationOption())
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    nacionalit: string;
}