import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserBody {
  @IsString()
  @IsNotEmpty()
  public name: string

  @IsEmail()
  @IsNotEmpty()
  public email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string
}