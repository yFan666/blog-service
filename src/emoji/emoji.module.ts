import { Module } from '@nestjs/common';
import { EmojiController } from './emoji.controller';
import { EmojiService } from './emoji.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emoji } from 'src/guard/entities/emoji.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emoji])],
  controllers: [EmojiController],
  providers: [EmojiService],
})
export class EmojiModule {}
