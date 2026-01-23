import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreatePostBodyDTO,
  GetPostItemDTO,
  UpdatePostBodyDTO,
} from 'src/routes/posts/post.dto';
import { PostsService } from 'src/routes/posts/posts.service';
import { AuthType, ConditionGuard } from 'src/shared/constants/auth.constant';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';
import { Auth } from 'src/shared/decorators/auth.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Auth([AuthType.Bearer, AuthType.ApiKey], { condition: ConditionGuard.Or })
  @Get()
  public getPosts(@ActiveUser('userId') userId: number) {
    return this.postsService
      .getPosts(userId)
      .then((posts) => posts.map((post) => new GetPostItemDTO(post)));
  }

  @Post()
  @Auth([AuthType.Bearer])
  public async createPost(
    @Body() body: CreatePostBodyDTO,
    @ActiveUser('userId') user: number,
  ) {
    return new GetPostItemDTO(await this.postsService.createPost(body, user));
  }

  @Get(':id')
  public async getPostDetail(@Param('id') id: string) {
    return new GetPostItemDTO(
      await this.postsService.getPostDetail(Number(id)),
    );
  }

  @Put(':id')
  @Auth([AuthType.Bearer])
  async updatePost(
    @Param('id') id: string,
    @Body() body: UpdatePostBodyDTO,
    @ActiveUser('userId') userId: number,
  ) {
    return new GetPostItemDTO(
      await this.postsService.updatePost(Number(id), body, userId),
    );
  }

  @Delete(':id')
  @Auth([AuthType.Bearer])
  async deletePost(
    @Param('id') id: string,
    @ActiveUser('userId') userId: number,
  ) {
    return await this.postsService.deletePost(Number(id), userId);
  }
}
