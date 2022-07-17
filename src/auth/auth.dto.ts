import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthBody {
  @IsEmail()
  @IsNotEmpty()
  public email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string
}

export class ChangePassword {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password_confirm: string
}