import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  password: string;

  @IsNotEmpty()
  role_id: number;

  // @IsNotEmpty()
  // role?: { id: number };
}

export class UserCreateSaveDto extends UserCreateDto {
  @IsNotEmpty()
  role_id: number;
}
