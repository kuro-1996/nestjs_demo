import { IsNotEmpty, IsString, MinLength, IsEmail } from "class-validator";
import { Match } from "utils/match.decorator";

export class ChangePassword {
  @IsEmail()
  @IsNotEmpty()
  public email: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Match('password')
  public password_confirm: string
}