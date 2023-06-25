import { PartialType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { CreatesongsDto } from "./create.songs.dto";

export class UpdateSongsDto extends PartialType(CreatesongsDto){
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    releaseyear: Date;

    @IsOptional()
    @IsString()
    gender: string;

}