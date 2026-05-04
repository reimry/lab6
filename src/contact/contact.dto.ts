import { IsEmail, IsString, Length } from "class-validator";

export class ContactDto {
  @IsString()
  @Length(2, 80)
  name!: string;

  @IsEmail()
  @Length(5, 120)
  email!: string;

  @IsString()
  @Length(2, 120)
  subject!: string;

  @IsString()
  @Length(10, 2000)
  message!: string;
}
