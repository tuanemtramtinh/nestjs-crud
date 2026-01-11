import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  public getPosts() {
    return 'All posts';
  }

  public createPost(body: any) {
    return body;
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
