import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public getPosts() {
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
