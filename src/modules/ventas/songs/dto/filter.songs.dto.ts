import { IsNumber, IsOptional, IsString, isString } from "class-validator";
import { PaginationDto } from "src/modules/ventas/pagination.dto";

export class FilterSongsDto extends PaginationDto{

@IsOptional()
@IsString(isStringValidationOptions())
readonly name:string;

}