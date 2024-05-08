import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

// 定义实体
@Entity()
export class Guard {
  //自增列(主键)
  @PrimaryGeneratedColumn()
  id: number;
  //普通列
  @Column()
  label: string;
  @Column()
  value: string;
  @CreateDateColumn({ type: 'datetime' })
  create_time: Date;
}
