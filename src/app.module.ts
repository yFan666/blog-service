import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GuardController } from './guard/guard.controller';
import { GuardModule } from './guard/guard.module';
import { businessModules } from './modules';
import loadConfig from './config/configurations';

const libModules = [
  // ConfigModule.forRoot()
  ConfigModule.forRoot({
    load: [loadConfig],
    envFilePath: ['.env'],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ ConfigModule ],
    inject: [ ConfigService ],
    useFactory: (configService: ConfigService) => {
      const { host, port, username, password, database, charset, entities } = configService.get('db');

      return {
        type: 'mysql',
        host,
        port,
        username,
        password,
        database,
        charset,
        entities: [__dirname + entities],
        synchronize: true, // 线上模式不要用
      }
    }
  })
]

@Module({
  imports: [
    ...libModules, // 第三方模块
    ...businessModules, // 业务模块
    GuardModule,
  ],
  controllers: [AppController, GuardController],
  providers: [AppService],
})
export class AppModule {}
