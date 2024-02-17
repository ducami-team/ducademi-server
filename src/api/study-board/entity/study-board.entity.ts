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

  @Column({ name : 'applyStartDate'})
  readonly applyStartDate : Date;

  @Column({name : 'applyEndDate'})
  readonly applyEndDate: Date;

  @Column({name : 'studyStartDate'})
  readonly studyStartDate : Date;

  @Column({name : 'studyEndDate'})
  readonly studyEndDate : Date;

  @ManyToOne(() => User, (User) => User.studyBoardId)
  user: User;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
