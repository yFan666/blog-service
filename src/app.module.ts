import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardController } from './guard/guard.controller';
import { GuardModule } from './guard/guard.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // 注册数据库
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'youli',
      password: '123456',
      database: 'nest_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    GuardModule,
    UserModule,
  ],
  controllers: [AppController, GuardController],
  providers: [AppService],
})
export class AppModule {}




// create user 'youli' identified with mysql_native_password by '123456';