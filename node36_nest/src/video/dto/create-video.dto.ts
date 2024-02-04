import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVideoDto {
    @ApiProperty()
    @IsNotEmpty({message:"video name is required"})
    @IsString()
    video_name:string;

    @ApiProperty()
    @IsNotEmpty({message:"description is required"})
    @IsString()
    description:string
}
