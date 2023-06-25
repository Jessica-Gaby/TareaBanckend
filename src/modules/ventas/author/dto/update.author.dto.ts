import { PartialType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { CreateauthorDto } from "./create.author.dto";

export class UpdateAuthorDto extends PartialType(CreateauthorDto){
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    nacionalit: string;

}