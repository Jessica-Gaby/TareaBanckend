import { Exclude, Expose } from "class-transformer";
import { BaseAuthorDto } from "./base.author.dto";

@Exclude()
export class ReadAuthorDto extends BaseAuthorDto{
    
@Expose()
readonly name;

@Expose()
readonly nacionalit;

}