import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class registerUserDTO {
    @ApiProperty()
    @IsNotEmpty( {message: 'email is required'})
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: 'pass_word is required' })
    pass_word: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: 'full_name is required' })
    full_name: string;
    
}