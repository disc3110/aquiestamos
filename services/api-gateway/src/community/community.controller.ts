import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Req,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtPayload } from '../auth/jwt-payload.type';
import type { AuthenticatedRequest } from '../auth/auth-request.type';

interface CreatePostBody {
  title: string;
  content: string;
  imageUrl?: string;
  metroArea?: string;
}

interface CreateCommentBody {
  content: string;
}

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @UseGuards(JwtAuthGuard)
  @Post('posts')
  async createPost(
    @Body() body: CreatePostBody,
    @Req() req: AuthenticatedRequest,
  ) {
    console.log('Request user:', req.user);

    const user = req.user as JwtPayload;

    return this.communityService.createPost({
      authorId: user.sub,
      title: body.title,
      content: body.content,
      imageUrl: body.imageUrl,
      metroArea: body.metroArea ?? 'vancouver-bc',
    });
  }

  @Get('posts')
  async getPosts() {
    return this.communityService.getPosts();
  }

  @UseGuards(JwtAuthGuard)
  @Post('posts/:postId/comments')
  async createComment(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() body: CreateCommentBody,
    @Req() req: AuthenticatedRequest,
  ) {
    const user = req.user as JwtPayload;

    return this.communityService.addComment({
      postId,
      authorId: user.sub,
      content: body.content,
    });
  }

  // 👇 Nuevo: listar comentarios
  @Get('posts/:postId/comments')
  async getComments(@Param('postId', ParseIntPipe) postId: number) {
    return this.communityService.getComments(postId);
  }
}
