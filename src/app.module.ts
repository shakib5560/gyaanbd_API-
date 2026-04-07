import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { MailModule } from './mail/mail.module';
import { CourseModule } from './course/course.module';
import { PaymentModule } from './payment/payment.module';
import { CategoryModule } from './category/category.module';
import { ModuleModule } from './module/module.module';
import { LessonModule } from './lesson/lesson.module';
import { AssignmentModule } from './assignment/assignment.module';
import { McqModule } from './mcq/mcq.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    PrismaModule,
    MailModule,
    CourseModule,
    PaymentModule,
    CategoryModule,
    ModuleModule,
    LessonModule,
    AssignmentModule,
    McqModule,
    WalletModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}