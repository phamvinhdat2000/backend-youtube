import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class loginDTO {
    @IsEmail({}, { message: 'Invalid email message' }) //validation field
    @ApiProperty()  // hiển thị field lên swagger UI
   @Expose()
    email: string;

    @IsNotEmpty({ message: 'pass_word is required' })
    @ApiProperty()
   @Expose()
    pass_word: string
}