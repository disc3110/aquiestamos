import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  createPost(dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        authorId: dto.authorId,
        title: dto.title,
        content: dto.content,
        imageUrl: dto.imageUrl,
        metroArea: dto.metroArea ?? 'vancouver-bc',
      },
    });
  }

  getAllPosts() {
    return this.prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}
