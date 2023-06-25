import { IsNumber, IsOptional, IsString, isString } from "class-validator";
import { PaginationDto } from "src/modules/ventas/pagination.dto";

export class FilterAuthorDto extends PaginationDto{

@IsOptional()
@IsString(isStringValidationOptions())
readonly name:string;

}