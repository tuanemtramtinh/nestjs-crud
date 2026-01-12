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
import envConfig from 'src/shared/config';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public getPosts() {
    console.log(envConfig.ACCESS_TOKEN_SECRET);
    return this.postsService.getPosts();
  }

  @Post()
  public createPost(@Body() body: any) {
    return this.postsService.createPost(body);
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
