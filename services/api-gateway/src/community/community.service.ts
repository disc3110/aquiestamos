import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Post } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';

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
}
