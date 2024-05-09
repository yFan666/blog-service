import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Emoji {
  //自增列(主键)
  @PrimaryGeneratedColumn()
  id: number;
  //普通列
  @Column({ length: 425 })
  emoji: string;
  @Column()
  emoji_demo: string;
  @Column()
  explain: string;
  @CreateDateColumn({ type: 'datetime' })
  create_time: Date;
}
