import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Param('postId', ParseIntPipe) postId: number,
    @Body() body: { authorId: number; content: string },
  ) {
    const dto: CreateCommentDto = {
      postId,
      authorId: body.authorId,
      content: body.content,
    };

    return this.commentsService.addComment(dto);
  }

  @Get()
  async findAll(@Param('postId', ParseIntPipe) postId: number) {
    return this.commentsService.getCommentsForPost(postId);
  }
}
