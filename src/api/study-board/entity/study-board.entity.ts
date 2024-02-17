import { Category } from 'src/api/category/entity/category.entity';
import { User } from 'src/api/user/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('study')
export class StudyBoard {
  @PrimaryGeneratedColumn({ name: 'id' })
  readonly id: number;

  @Column({ name: 'title' })
  readonly title: string;

  @Column({ name: 'description', length: 1000 })
  readonly description: string;

  @Column({ name: 'maxmember' })
  readonly maxmember: number;

  @Column({ name: 'recommendtarget' })
  readonly recommendtarget: string;

  @Column({ name : 'startDate'})
  readonly startDate : Date;

  @Column({name : 'endDate'})
  readonly endDate: Date;

  @ManyToOne(() => User, (User) => User.studyBoardId)
  user: User;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
