import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from 'src/routes/posts/posts.service';
import { AuthType, ConditionGuard } from 'src/shared/constants/auth.constant';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';
import { Auth } from 'src/shared/decorators/auth.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Auth([AuthType.Bearer, AuthType.ApiKey], { condition: ConditionGuard.Or })
  @Get()
  public getPosts() {
    return this.postsService.getPosts();
  }

  @Post()
  @Auth([AuthType.Bearer])
  public createPost(@Body() body: any, @ActiveUser('userId') user: number) {
    return this.postsService.createPost(body, user);
  }

  @Get(':id')
  public getPostDetail(@Param('id') id: string) {
    return this.postsService.getPostDetail(id);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() body: any) {
    return this.postsService.updatePost(id, body);
  }

  @Delete(':id')
  deletePost(@Param() id: string) {
    return this.postsService.deletePost(id);
  }
}
