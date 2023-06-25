import { PartialType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { CreateSongsDto } from "./create.songs.dto";

export class UpdateSongsDto extends PartialType(CreateSongsDto){
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