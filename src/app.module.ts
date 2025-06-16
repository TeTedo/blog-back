import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './modules/post/post.module';
import { CommentModule } from './modules/comment/comment.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { FileModule } from './modules/file/file.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    PostModule,
    CommentModule,
    AuthModule,
    AdminModule,
    FileModule,
    CategoryModule,
    UserModule,
    TagModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
