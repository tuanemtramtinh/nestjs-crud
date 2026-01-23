import { Exclude } from 'class-transformer';
import { UserModel } from 'generated/prisma/models';

export class UserDTOModel implements UserModel {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  @Exclude() password: string;

  constructor(partial: Partial<UserDTOModel>) {
    Object.assign(this, partial);
  }
}
