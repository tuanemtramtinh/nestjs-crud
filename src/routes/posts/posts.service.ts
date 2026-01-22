/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getPosts() {
    return await this.prismaService.post.findMany({});
  }

  public async createPost(body: any, userId: number) {
    return await this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
  }

  public getPostDetail(id: string) {
    return `Post ${id}`;
  }

  public updatePost(id: string, body: any) {
    return `Update post ${id}`;
  }

  public deletePost(id: string) {
    return `Delete post ${id}`;
  }
}
