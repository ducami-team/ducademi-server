import { StudyBoard } from 'src/api/study-board/entity/study-board.entity';
import { UserRole } from 'src/global/constatnts/userRole.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'userId', unique : true })
  userId: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'grade' })
  grade: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.user,
  })
  role: UserRole;

  @OneToMany(()=> StudyBoard, (study)=>study.id)
  studyBoardId : number;
}
