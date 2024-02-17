import { StudyBoard } from 'src/api/study-board/entity/study-board.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', unique: true })
  name: string;

  @ManyToMany(() => StudyBoard, (study) => study.categories)
  study: StudyBoard[];
}
