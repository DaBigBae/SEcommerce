import {IsEmail, IsString, IsNotEmpty, MinLength, MaxLength} from 'class-validator';

export class LogInDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8,{
    message: "Password is too weak."
  })
  password: string;
}

export default LogInDto;
