import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

export class UpdateUserDto {
    @IsEmail({}, { message: 'Invalid email message' })
    @ApiProperty()
    @Expose()
    email?:string;
    
    @ApiProperty()
    @IsNotEmpty({ message: 'full_name is required' })
    full_name?:string
}
