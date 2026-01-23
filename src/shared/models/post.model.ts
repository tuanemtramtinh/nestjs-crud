import { PostModel } from 'generated/prisma/models';

export class PostDTOModel implements PostModel {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<PostDTOModel>) {
    Object.assign(this, partial);
  }
}
