import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './module/post/post.module';
import { CommentModule } from './module/comment/comment.module';
import { AuthModule } from './module/auth/auth.module';
import { AdminModule } from './module/admin/admin.module';
import { FileModule } from './module/file/file.module';

@Module({
  imports: [PostModule, CommentModule, AuthModule, AdminModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
