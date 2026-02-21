import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Post } from './interfaces/post.interface';
import { Comment } from './interfaces/comment.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommunityService {
  constructor(private readonly http: HttpService) {}

  async createPost(data: CreatePostDto): Promise<Post> {
    const response$ = this.http.post<Post>('/posts', data);
    const { data: result } = await firstValueFrom(response$);
    return result;
  }

  async getPosts(): Promise<Post[]> {
    const response$ = this.http.get<Post[]>('/posts');
    const { data } = await firstValueFrom(response$);
    return data;
  }

  async addComment(data: CreateCommentDto): Promise<Comment> {
    const response$ = this.http.post<Comment>(
      `/posts/${data.postId}/comments`,
      {
        authorId: data.authorId,
        content: data.content,
      },
    );

    const { data: result } = await firstValueFrom(response$);
    return result;
  }

  async getComments(postId: number): Promise<Comment[]> {
    const response$ = this.http.get<Comment[]>(`/posts/${postId}/comments`);

    const { data } = await firstValueFrom(response$);
    return data;
  }
}
