import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { PostDTOModel } from 'src/shared/models/post.model';
import { UserDTOModel } from 'src/shared/models/user.model';

export class GetPostItemDTO extends PostDTOModel {
  @Type(() => UserDTOModel)
  author: Omit<UserDTOModel, 'password'>;
  constructor(partial: Partial<GetPostItemDTO>) {
    super(partial);
    Object.assign(this, partial);
  }
}

export class CreatePostBodyDTO {
  @IsString()
  title: string;
  @IsString()
  content: string;

  constructor(partial: Partial<CreatePostBodyDTO>) {
    Object.assign(this, partial);
  }
}

export class UpdatePostBodyDTO extends PartialType(CreatePostBodyDTO) {}
