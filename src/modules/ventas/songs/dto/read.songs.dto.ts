import { Exclude, Expose } from "class-transformer";
import { BaseSongsDto } from "./base.songs.dto";

@Exclude()
export class ReadSongsDto extends BaseSongsDto{
    
@Expose()
readonly title;

@Expose()
readonly releaseyear;

@Expose()
readonly gender;

}