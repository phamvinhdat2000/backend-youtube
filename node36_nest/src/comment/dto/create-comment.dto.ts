import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @ApiProperty()
    @IsNotEmpty({message:"Content is required"})
    content:string

    @ApiProperty()
    @IsNotEmpty({message:"Video_id is required"})
    video_id:number

    @ApiProperty()
    user_id:number

    @ApiProperty()
    @Transform(({ value }) => value.toISOString())
    date_create?:Date
}
