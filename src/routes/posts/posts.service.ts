import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePostBodyDTO,
  UpdatePostBodyDTO,
} from 'src/routes/posts/post.dto';
import { isNotFoundError } from 'src/shared/helpers';
import { PrismaService } from 'src/shared/services/prisma.service';
@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getPosts(userId: number) {
    return await this.prismaService.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
      },
    });
  }

  public async createPost(body: CreatePostBodyDTO, userId: number) {
    return await this.prismaService.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
      },
    });
  }

  public async getPostDetail(postId: number) {
    return await this.prismaService.post.findUniqueOrThrow({
      where: { id: postId },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
      },
    });
  }

  public async updatePost(id: number, body: UpdatePostBodyDTO, userId: number) {
    try {
      return await this.prismaService.post.update({
        data: body,
        where: { id: id, authorId: userId },
      });
    } catch (error) {
      if (isNotFoundError(error)) {
        throw new NotFoundException(
          `Post with id ${id} not found or you do not have permission to update it.`,
        );
      }

      throw error;
    }
  }

  public async deletePost(id: number, userId: number) {
    try {
      await this.prismaService.post.delete({
        where: { id: id, authorId: userId },
      });

      return true;
    } catch (error) {
      if (isNotFoundError(error)) {
        throw new NotFoundException(
          `Post with id ${id} not found or you do not have permission to delete it.`,
        );
      }
      throw error;
    }
  }
}
