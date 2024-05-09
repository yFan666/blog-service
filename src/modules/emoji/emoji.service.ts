import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Emoji } from 'src/guard/entities/emoji.entity';
import axios from 'axios';
import * as cheerio from 'cheerio';

@Injectable()
export class EmojiService {
  constructor(
    @InjectRepository(Emoji) private readonly emoji: Repository<Emoji>,
  ) {}

  async getEmoji() {
    const { data } = await axios.get(
      'https://cloud.tencent.com/developer/article/2067309',
    );
    // cheerio解析html
    const $ = cheerio.load(data);
    // 存储键值对
    const emojiList = [];

    $('tr').each((trIdx, trEle) => {
      const divsP = $(trEle).find('div.table-cell > p');
      const regex = /^(.*?):(.*?):(.*)$/; // 正则表达式，用来匹配字符串
      const matchesValue = divsP?.text()?.match(regex); // 使用正则表达式匹配字符串

      matchesValue &&
        emojiList.push({
          emoji: matchesValue[1],
          emoji_demo: `:${matchesValue[2]}:`,
          explain: matchesValue[3],
        });
    });
    emojiList.forEach(async (emoji, index) => {
      await this.emoji.save(emoji);
    });

    return emojiList;
  }

  async findAll() {
    return await this.emoji.find();
  }
}
