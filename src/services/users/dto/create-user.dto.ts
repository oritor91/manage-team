export class CreateUserDto {
  name: string;
  phone: string;
}

export class NewUserDto extends CreateUserDto {
  selfRegistered: boolean;
  lastLogin: Date;
}
