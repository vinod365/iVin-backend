import { IsEmail, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Role, Status } from '../entities/user.entity';

export class CreateUserDto {

  @IsOptional()
  @IsString()
  uid?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(Role, { message: 'role must be either admin or dealer' })
  role?: Role;

  @IsOptional()
  @IsEnum(Status, { message: 'status must be either active or inactive' })
  status?: Status;
}
