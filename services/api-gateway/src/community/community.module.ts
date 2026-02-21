import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    HttpModule.register({
      baseURL: process.env.COMMUNITY_SERVICE_URL || 'http://localhost:3001',
      timeout: 5000,
    }),
    AuthModule,
  ],
  providers: [CommunityService],
  controllers: [CommunityController],
})
export class CommunityModule {}
