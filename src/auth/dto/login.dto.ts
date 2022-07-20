import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginBody {
  @IsEmail()
  @IsNotEmpty()
  public email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string
}

