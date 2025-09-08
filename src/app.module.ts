import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { LoansModule } from './loans/loans.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, BooksModule, LoansModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
