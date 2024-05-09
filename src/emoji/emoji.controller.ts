import { EmojiService } from './emoji.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('emoji')
export class EmojiController {
  constructor(private readonly emojiService: EmojiService) {}
  @Get('getMaterial')
  getInfo() {
    return this.emojiService.getEmoji();
  }

  @Get()
  async findAll() {
    return {
      code: 200,
      data: await this.emojiService.findAll(),
    };
  }
}
