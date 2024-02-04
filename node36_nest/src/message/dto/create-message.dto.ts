import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";

export class CreateMessageDto {
    @ApiProperty()
    @IsNotEmpty()
    room_id:number

    @ApiProperty()
    @IsNotEmpty()
    content:string

    @ApiProperty()
    @IsNotEmpty()
    role:string

    @Transform(({ value }) => value.toISOString())
    create_at?:Date

}
