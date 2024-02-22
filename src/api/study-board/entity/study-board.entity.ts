import { Category } from 'src/api/category/entity/category.entity';
import { Registration } from 'src/api/registration/entity/registration.entity';

import { User } from 'src/api/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
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

  @Column({ name: 'applyStartDate' })
  readonly applyStartDate: Date;

  @Column({ name: 'applyEndDate' })
  readonly applyEndDate: Date;

  @Column({ name: 'studyStartDate' })
  readonly studyStartDate: Date;

  @Column({ name: 'studyEndDate' })
  readonly studyEndDate: Date;

  @CreateDateColumn({ name: 'createdAt' })
  readonly createdAt: Date;

  @Column({ name: 'image', nullable: true })
  readonly image: string;

  @ManyToOne(() => User, (User) => User.studyBoardId)
  user: User;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Registration, (registration) => registration.study)
  registration: Registration[];
}
